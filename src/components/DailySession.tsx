import { useState, useEffect } from 'react';
import type { SRSCard, VocabEntry, CEFRLevel, ConfidenceRating } from '../types';
import { generateDailySession } from '../engine/session';
import type { SessionPlan } from '../engine/session';
import { reviewCard, createCardFromVocab, getDueCards } from '../engine/srs';
import { speakItalian, isSpeechSupported } from '../engine/tts';
import { XP_REWARDS } from '../engine/scoring';

export function DailySession({ cards, onUpdateCards, onXp, onComplete, userLevel, availableVocab, settings }: {
  cards: SRSCard[];
  onUpdateCards: (cards: SRSCard[]) => void;
  onXp: (xp: number) => void;
  onComplete: () => void;
  userLevel: CEFRLevel;
  availableVocab: VocabEntry[];
  settings: { srsReview: number; newContent: number; listening: number; scenario: number };
}) {
  const [plan, setPlan] = useState<SessionPlan | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [sessionStartTime] = useState(Date.now());
  const [sessionXp, setSessionXp] = useState(0);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);

  useEffect(() => {
    const sessionPlan = generateDailySession(cards, userLevel, availableVocab, settings, 20);
    setPlan(sessionPlan);
  }, []);

  if (!plan || plan.exercises.length === 0) {
    return (
      <div className="animate-fade-in text-center py-12">
        <div className="text-5xl mb-4">🎯</div>
        <h2 className="text-xl font-bold text-text-bright mb-3">Sesja dzienna</h2>
        <p className="text-text-dim mb-6">Brak ćwiczeń na dziś. Dodaj nowe słowa lub wróć później!</p>
        <button onClick={onComplete} className="px-6 py-3 bg-accent text-bg font-semibold rounded-xl hover:bg-accent-dim">
          Powrót do Dashboard
        </button>
      </div>
    );
  }

  const exercise = plan.exercises[currentIndex];

  // Session complete
  if (!exercise) {
    const elapsed = Math.round((Date.now() - sessionStartTime) / 60000);
    const accuracy = sessionTotal > 0 ? Math.round((sessionCorrect / sessionTotal) * 100) : 0;

    return (
      <div className="animate-slide-up text-center py-8">
        <div className="text-5xl mb-4">🏆</div>
        <h2 className="text-2xl font-bold text-text-bright mb-2">Sesja ukończona!</h2>

        <div className="bg-bg-card rounded-2xl p-6 border border-border max-w-sm mx-auto mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-2xl font-bold text-xp">{sessionXp}</div>
              <div className="text-xs text-text-dim">XP zdobyte</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent">{accuracy}%</div>
              <div className="text-xs text-text-dim">Trafność</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-text-bright">{plan.exercises.length}</div>
              <div className="text-xs text-text-dim">Ćwiczeń</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-text-bright">{elapsed}m</div>
              <div className="text-xs text-text-dim">Czas</div>
            </div>
          </div>
        </div>

        <button
          onClick={() => { onXp(XP_REWARDS.dailySessionComplete); onComplete(); }}
          className="mt-6 px-8 py-4 bg-accent text-bg font-bold text-lg rounded-xl hover:bg-accent-dim"
        >
          Kontynuuj (+{XP_REWARDS.dailySessionComplete} XP)
        </button>
      </div>
    );
  }

  const progress = currentIndex / plan.exercises.length;

  const addXpLocal = (xp: number) => {
    setSessionXp(x => x + xp);
    onXp(xp);
  };

  const nextExercise = () => {
    setShowAnswer(false);
    setShowResult(false);
    setUserInput('');
    setCurrentIndex(i => i + 1);
  };

  // Render exercise based on type
  const renderExercise = () => {
    switch (exercise.type) {
      case 'srs_review': {
        const card = exercise.data as SRSCard;
        return (
          <div className="bg-bg-card rounded-2xl p-6 border border-border text-center min-h-[240px] flex flex-col justify-center">
            <div className="text-xs text-text-dim uppercase tracking-wide mb-4">Powtórka SRS</div>
            <div className="text-2xl font-bold text-text-bright mb-2">{card.italian}</div>
            {isSpeechSupported() && (
              <button onClick={() => speakItalian(card.italian)} className="text-accent text-sm hover:underline mb-4 mx-auto">
                🔊 Posłuchaj
              </button>
            )}

            {!showAnswer ? (
              <button onClick={() => setShowAnswer(true)} className="text-text-dim text-sm mt-4 hover:text-text">
                Pokaż odpowiedź
              </button>
            ) : (
              <div className="animate-fade-in mt-4">
                <div className="h-px bg-border mb-4" />
                <div className="text-xl text-accent font-semibold mb-3">{card.polish}</div>
                {card.exampleSentence && (
                  <div className="text-sm text-text-dim italic">"{card.exampleSentence}"</div>
                )}
                <div className="grid grid-cols-4 gap-2 mt-6">
                  {([1, 2, 3, 4] as ConfidenceRating[]).map(r => (
                    <button
                      key={r}
                      onClick={() => {
                        const updated = reviewCard(card, r);
                        const newCards = cards.map(c => c.id === updated.id ? updated : c);
                        onUpdateCards(newCards);
                        const correct = r >= 3;
                        setSessionCorrect(c => c + (correct ? 1 : 0));
                        setSessionTotal(t => t + 1);
                        addXpLocal(correct ? XP_REWARDS.srsCorrect : XP_REWARDS.srsIncorrect);
                        nextExercise();
                      }}
                      className={`py-2 rounded-lg text-sm font-medium text-white ${
                        r === 1 ? 'bg-danger' : r === 2 ? 'bg-warning' : r === 3 ? 'bg-accent' : 'bg-info'
                      }`}
                    >
                      {r === 1 ? '✗' : r === 2 ? '~' : r === 3 ? '✓' : '✓✓'}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      }

      case 'new_vocab': {
        const vocab = exercise.data as VocabEntry;
        return (
          <div className="bg-bg-card rounded-2xl p-6 border border-border text-center">
            <div className="text-xs text-accent uppercase tracking-wide mb-4">Nowe słowo</div>
            <div className="text-2xl font-bold text-text-bright mb-1">{vocab.italian}</div>
            {isSpeechSupported() && (
              <button onClick={() => speakItalian(vocab.italian)} className="text-accent text-sm hover:underline mb-3 mx-auto block">
                🔊 Posłuchaj
              </button>
            )}
            <div className="text-lg text-text mb-3">{vocab.polish}</div>
            <div className="text-sm text-text-dim">
              {vocab.partOfSpeech}{vocab.gender ? ` • ${vocab.gender === 'masculine' ? 'r.m.' : 'r.ż.'}` : ''}
            </div>
            <div className="bg-bg rounded-lg p-3 mt-4 text-left">
              <div className="text-sm text-accent italic">"{vocab.exampleIt}"</div>
              <div className="text-sm text-text-dim mt-1">"{vocab.examplePl}"</div>
            </div>
            <button
              onClick={() => {
                const card = createCardFromVocab(vocab);
                onUpdateCards([...cards, card]);
                addXpLocal(XP_REWARDS.srsCorrect);
                nextExercise();
              }}
              className="mt-4 w-full py-3 bg-accent text-bg font-semibold rounded-xl hover:bg-accent-dim"
            >
              Dodaj i kontynuuj →
            </button>
          </div>
        );
      }

      case 'grammar':
      case 'listening':
      case 'shadowing':
      case 'scenario':
      case 'reading':
      case 'writing': {
        // Quick exercise: translate a random phrase
        const exerciseTypes: Record<string, { label: string; icon: string }> = {
          grammar: { label: 'Gramatyka', icon: '📐' },
          listening: { label: 'Słuchanie', icon: '🎧' },
          shadowing: { label: 'Shadowing', icon: '🗣️' },
          scenario: { label: 'Scenariusz', icon: '🎭' },
          reading: { label: 'Czytanie', icon: '📖' },
          writing: { label: 'Pisanie', icon: '✍️' },
        };
        const info = exerciseTypes[exercise.type];

        // Generate a quick translation exercise — prefer due cards at user's level
        const levelOrder: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
        const userLevelIdx = levelOrder.indexOf(userLevel);
        const levelCards = cards.filter(c => levelOrder.indexOf(c.level) <= userLevelIdx);
        const pool = getDueCards(levelCards.length > 0 ? levelCards : cards).slice(0, 20);
        const fallback = levelCards.length > 0 ? levelCards : cards;
        const randomCard = pool[Math.floor(Math.random() * Math.max(pool.length, 1))] || fallback[Math.floor(Math.random() * Math.max(fallback.length, 1))];

        if (!randomCard) {
          return (
            <div className="bg-bg-card rounded-2xl p-6 border border-border text-center">
              <div className="text-2xl mb-3">{info.icon}</div>
              <div className="text-xs text-text-dim uppercase mb-3">{info.label}</div>
              <p className="text-text-dim">Dodaj więcej słów, żeby odblokować to ćwiczenie</p>
              <button onClick={nextExercise} className="mt-4 px-6 py-2 bg-bg border border-border rounded-lg text-text text-sm">
                Dalej →
              </button>
            </div>
          );
        }

        const isReverse = Math.random() > 0.5;

        return (
          <div className="bg-bg-card rounded-2xl p-6 border border-border">
            <div className="text-xs text-text-dim uppercase tracking-wide mb-1 flex items-center gap-2">
              <span>{info.icon}</span> {info.label}
            </div>
            <div className="text-sm text-text-dim mb-4">
              {isReverse ? 'Przetłumacz na włoski:' : 'Przetłumacz na polski:'}
            </div>
            <div className="text-xl font-bold text-text-bright mb-4">
              {isReverse ? randomCard.polish : randomCard.italian}
            </div>

            {!showResult ? (
              <>
                <input
                  type="text"
                  value={userInput}
                  onChange={e => setUserInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && userInput.trim() && setShowResult(true)}
                  placeholder={isReverse ? 'Wpisz po włosku...' : 'Wpisz po polsku...'}
                  className="w-full px-4 py-3 bg-bg-input border border-border rounded-xl text-text placeholder-text-dim focus:outline-none focus:border-accent"
                  autoFocus
                />
                <button
                  onClick={() => setShowResult(true)}
                  disabled={!userInput.trim()}
                  className={`w-full mt-3 py-3 font-semibold rounded-xl transition-colors ${
                    userInput.trim() ? 'bg-accent text-bg hover:bg-accent-dim' : 'bg-bg text-text-dim border border-border cursor-not-allowed'
                  }`}
                >
                  Sprawdź
                </button>
              </>
            ) : (
              <div className="animate-fade-in">
                {(() => {
                  const expected = isReverse ? randomCard.italian : randomCard.polish;
                  const inp = userInput.trim().toLowerCase();
                  const exp = expected.toLowerCase();
                  const correct = inp === exp || inp.includes(exp) || exp.includes(inp) || levenshtein(inp, exp) <= 2;
                  return (
                    <>
                      <div className={`p-4 rounded-lg mb-3 ${correct ? 'bg-accent/10 border border-accent/30' : 'bg-danger/10 border border-danger/30'}`}>
                        {correct ? (
                          <div className="text-accent font-semibold">✓ Perfetto!</div>
                        ) : (
                          <div>
                            <div className="text-danger font-semibold mb-1">Poprawna odpowiedź:</div>
                            <div className="text-text-bright text-lg">{expected}</div>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          setSessionCorrect(c => c + (correct ? 1 : 0));
                          setSessionTotal(t => t + 1);
                          addXpLocal(correct ? XP_REWARDS.srsCorrect : XP_REWARDS.srsIncorrect);
                          nextExercise();
                        }}
                        className="w-full py-3 bg-accent text-bg font-semibold rounded-xl hover:bg-accent-dim"
                      >
                        Dalej →
                      </button>
                    </>
                  );
                })()}
              </div>
            )}
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-text-bright">Sesja dzienna</h2>
        <div className="flex items-center gap-3">
          <span className="text-sm text-xp">{sessionXp} XP</span>
          <span className="text-sm text-text-dim">{currentIndex + 1}/{plan.exercises.length}</span>
        </div>
      </div>

      {/* Progress */}
      <div className="w-full bg-bg-card rounded-full h-2 mb-6 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-accent-dim to-accent rounded-full transition-all duration-500" style={{ width: `${progress * 100}%` }} />
      </div>

      {renderExercise()}
    </div>
  );
}

function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) => Array.from({ length: n + 1 }, (_, j) => i === 0 ? j : j === 0 ? i : 0));
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i-1] === b[j-1] ? dp[i-1][j-1] : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
  return dp[m][n];
}
