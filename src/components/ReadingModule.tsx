import { useState } from 'react';
import type { ReadingText, CEFRLevel } from '../types';
import { speakItalian, isSpeechSupported } from '../engine/tts';

export function ReadingModule({ texts, userLevel, onXp }: {
  texts: ReadingText[];
  userLevel: CEFRLevel;
  onXp: (xp: number) => void;
}) {
  const [selectedText, setSelectedText] = useState<ReadingText | null>(null);
  const [mode, setMode] = useState<'read' | 'quiz'>('read');
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [activeWord, setActiveWord] = useState<string | null>(null);
  const [ttsSpeed, setTtsSpeed] = useState(1.0);

  const levelOrder: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  if (!selectedText) {
    const byLevel = levelOrder.map(level => ({
      level,
      texts: texts.filter(t => t.level === level),
      unlocked: levelOrder.indexOf(level) <= levelOrder.indexOf(userLevel),
    }));

    return (
      <div className="animate-fade-in">
        <h2 className="text-xl font-bold text-text-bright mb-2">Czytanie</h2>
        <p className="text-text-dim text-sm mb-6">
          Krashen i+1 — teksty lekko powyżej Twojego poziomu. Kliknij dowolne słowo, żeby zobaczyć tłumaczenie.
        </p>

        <div className="space-y-6">
          {byLevel.map(({ level, texts: lvlTexts, unlocked }) => (
            lvlTexts.length > 0 && (
              <div key={level}>
                <h3 className="text-sm font-semibold text-text-bright mb-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${unlocked ? 'bg-accent/20 text-accent' : 'bg-bg-hover text-text-dim'}`}>
                    {level}
                  </span>
                </h3>
                <div className="grid gap-2">
                  {lvlTexts.map(text => (
                    <button
                      key={text.id}
                      onClick={() => unlocked && setSelectedText(text)}
                      disabled={!unlocked}
                      className={`text-left p-4 rounded-xl border transition-colors ${
                        unlocked ? 'bg-bg-card border-border hover:bg-bg-hover' : 'bg-bg-card/50 border-border/50 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-text-bright">{text.title}</div>
                          <div className="text-xs text-text-dim mt-1">
                            {text.category} • {text.italian.split(/\s+/).length} słów • {text.comprehensionQuestions.length} pytań
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    );
  }

  // Quiz mode
  if (mode === 'quiz') {
    const question = selectedText.comprehensionQuestions[quizIndex];

    if (!question) {
      const total = selectedText.comprehensionQuestions.length;
      return (
        <div className="animate-slide-up text-center py-8">
          <div className="text-4xl mb-4">{score >= total * 0.8 ? '🏆' : '📖'}</div>
          <h2 className="text-xl font-bold text-text-bright mb-2">Zrozumienie tekstu</h2>
          <div className="text-3xl font-bold text-accent mb-1">{score}/{total}</div>
          <div className="text-text-dim mb-6">poprawnych odpowiedzi</div>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => { setMode('read'); setQuizIndex(0); setScore(0); setSelectedAnswer(null); setShowAnswer(false); }}
              className="px-6 py-3 bg-bg-card border border-border rounded-xl hover:bg-bg-hover text-text"
            >
              Czytaj ponownie
            </button>
            <button
              onClick={() => {
                const earned = Math.max(5, Math.round(30 * score / total));
                setSelectedText(null); setMode('read'); setQuizIndex(0); setScore(0);
                onXp(earned);
              }}
              className="px-6 py-3 bg-accent text-bg font-semibold rounded-xl hover:bg-accent-dim"
            >
              Następny tekst
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => setMode('read')} className="text-text-dim hover:text-text text-sm">← Wróć do tekstu</button>
          <span className="text-sm text-text-dim">{quizIndex + 1}/{selectedText.comprehensionQuestions.length}</span>
        </div>

        <div className="bg-bg-card rounded-2xl p-6 border border-border">
          <div className="text-lg text-text-bright mb-6">{question.question}</div>
          <div className="space-y-2">
            {question.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => !showAnswer && setSelectedAnswer(i)}
                disabled={showAnswer}
                className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${
                  showAnswer && i === question.correctIndex ? 'border-accent bg-accent/10 text-accent' :
                  showAnswer && i === selectedAnswer && i !== question.correctIndex ? 'border-danger bg-danger/10 text-danger' :
                  selectedAnswer === i ? 'border-accent bg-accent/10 text-accent' :
                  'border-border bg-bg hover:bg-bg-hover text-text'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {showAnswer && (
            <div className="mt-4 p-3 bg-bg rounded-lg text-sm text-text-dim animate-fade-in">
              {question.explanationPl}
            </div>
          )}
        </div>

        {!showAnswer ? (
          <button
            onClick={() => {
              setShowAnswer(true);
              if (selectedAnswer === question.correctIndex) setScore(s => s + 1);
            }}
            disabled={selectedAnswer === null}
            className={`w-full mt-4 py-4 font-bold rounded-xl ${
              selectedAnswer !== null ? 'bg-accent text-bg hover:bg-accent-dim' : 'bg-bg-card text-text-dim border border-border cursor-not-allowed'
            }`}
          >
            Sprawdź
          </button>
        ) : (
          <button
            onClick={() => { setQuizIndex(i => i + 1); setSelectedAnswer(null); setShowAnswer(false); }}
            className="w-full mt-4 py-4 bg-accent text-bg font-bold rounded-xl hover:bg-accent-dim"
          >
            Dalej →
          </button>
        )}
      </div>
    );
  }

  // Read mode — tap-to-translate
  const words = selectedText.italian.split(/(\s+|[,.!?;:"""''()\n])/).filter(Boolean);

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => setSelectedText(null)} className="text-text-dim hover:text-text text-sm">← Powrót</button>
        <div className="flex items-center gap-2">
          {isSpeechSupported() && (
            <>
              <select
                value={ttsSpeed}
                onChange={e => setTtsSpeed(parseFloat(e.target.value))}
                className="text-xs bg-bg-card border border-border rounded px-2 py-1 text-text-dim"
              >
                <option value={0.75}>0.75x</option>
                <option value={1.0}>1.0x</option>
                <option value={1.25}>1.25x</option>
              </select>
              <button
                onClick={() => speakItalian(selectedText.italian, ttsSpeed)}
                className="px-3 py-1 bg-bg-card border border-border rounded text-sm text-accent hover:bg-bg-hover"
              >
                🔊 Czytaj
              </button>
            </>
          )}
        </div>
      </div>

      <div className="bg-bg-card rounded-2xl p-6 border border-border">
        <h3 className="text-lg font-semibold text-text-bright mb-1">{selectedText.title}</h3>
        <div className="text-xs text-text-dim mb-4 uppercase">{selectedText.level} • {selectedText.category}</div>

        <div
          className="leading-relaxed text-lg relative"
          onClick={e => { if (e.target === e.currentTarget) setActiveWord(null); }}
        >
          {words.map((word, i) => {
            const clean = word.toLowerCase().replace(/[,.!?;:"""''()]/g, '');
            const translation = selectedText.translations[clean];
            const key = `${i}-${word}`;
            const isActive = activeWord === key;

            if (!clean.trim()) return <span key={i}>{word}</span>;

            return (
              <span
                key={i}
                className={`relative cursor-pointer transition-colors ${
                  translation ? 'underline underline-offset-4 decoration-dotted decoration-accent/40' : ''
                } ${isActive ? 'text-accent' : 'text-text-bright'}`}
                onClick={() => {
                  if (!translation) return;
                  if (isActive) {
                    setActiveWord(null);
                  } else {
                    setActiveWord(key);
                    if (isSpeechSupported()) speakItalian(clean);
                  }
                }}
              >
                {word}
                {isActive && translation && (
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-bg-hover border border-border rounded-lg text-sm text-accent whitespace-nowrap z-10 shadow-lg animate-fade-in">
                    {translation}
                  </span>
                )}
              </span>
            );
          })}
        </div>
      </div>

      <button
        onClick={() => { setMode('quiz'); setQuizIndex(0); setScore(0); setSelectedAnswer(null); setShowAnswer(false); }}
        className="w-full mt-4 py-4 bg-accent text-bg font-bold rounded-xl hover:bg-accent-dim"
      >
        Sprawdź zrozumienie →
      </button>
    </div>
  );
}
