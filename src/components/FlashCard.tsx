import { useState, useEffect, useCallback } from 'react';
import type { SRSCard, ConfidenceRating, VocabEntry } from '../types';
import { getDueCards, reviewCard, createCardFromVocab } from '../engine/srs';
import { speakItalian, isSpeechSupported } from '../engine/tts';
import { XP_REWARDS } from '../engine/scoring';

export function FlashCards({ cards, onUpdateCards, onXp, availableVocab }: {
  cards: SRSCard[];
  onUpdateCards: (cards: SRSCard[]) => void;
  onXp: (xp: number) => void;
  availableVocab: VocabEntry[];
}) {
  const [dueCards, setDueCards] = useState<SRSCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [sessionStats, setSessionStats] = useState({ correct: 0, incorrect: 0, streak: 0 });
  const [mode, setMode] = useState<'review' | 'learn'>('review');
  const [newCardIndex, setNewCardIndex] = useState(0);

  useEffect(() => {
    const due = getDueCards(cards);
    setDueCards(due);
    if (due.length === 0) setMode('learn');
  }, [cards]);

  const currentCard = mode === 'review' ? dueCards[currentIndex] : null;

  // New vocab that isn't already a card
  const existingIds = new Set(cards.map(c => c.italian));
  const newVocab = availableVocab.filter(v => !existingIds.has(v.italian));
  const currentNewVocab = newVocab[newCardIndex];

  const handleConfidence = useCallback((confidence: ConfidenceRating) => {
    if (!currentCard) return;

    const updated = reviewCard(currentCard, confidence);
    const newCards = cards.map(c => c.id === updated.id ? updated : c);
    onUpdateCards(newCards);

    const correct = confidence >= 3;
    const newStreak = correct ? sessionStats.streak + 1 : 0;

    let xp = correct ? XP_REWARDS.srsCorrect : XP_REWARDS.srsIncorrect;
    if (newStreak === 5) xp += XP_REWARDS.srsStreak5;
    if (newStreak === 10) xp += XP_REWARDS.srsStreak10;
    onXp(xp);

    setSessionStats(s => ({
      correct: s.correct + (correct ? 1 : 0),
      incorrect: s.incorrect + (correct ? 0 : 1),
      streak: newStreak,
    }));

    setShowAnswer(false);
    if (currentIndex < dueCards.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      setDueCards([]);
      setCurrentIndex(0);
    }
  }, [currentCard, cards, currentIndex, dueCards.length, onUpdateCards, onXp, sessionStats.streak]);

  const handleLearnNew = () => {
    if (!currentNewVocab) return;
    const card = createCardFromVocab(currentNewVocab);
    onUpdateCards([...cards, card]);
    onXp(XP_REWARDS.srsCorrect);
    setNewCardIndex(i => i + 1);
  };

  const playAudio = (text: string) => {
    if (isSpeechSupported()) speakItalian(text);
  };

  // Review mode
  if (mode === 'review' && dueCards.length === 0) {
    return (
      <div className="animate-fade-in">
        <div className="text-center py-12">
          <div className="text-4xl mb-4">✅</div>
          <h2 className="text-xl font-bold text-text-bright mb-2">Wszystko powtórzone!</h2>
          <p className="text-text-dim mb-6">
            {sessionStats.correct + sessionStats.incorrect > 0
              ? `${sessionStats.correct} poprawnych, ${sessionStats.incorrect} do poprawy`
              : 'Brak kart do powtórki'}
          </p>
          {newVocab.length > 0 && (
            <button
              onClick={() => setMode('learn')}
              className="px-6 py-3 bg-accent text-bg font-semibold rounded-lg hover:bg-accent-dim transition-colors"
            >
              Ucz się nowych słów ({newVocab.length} dostępnych)
            </button>
          )}
        </div>

        {sessionStats.correct + sessionStats.incorrect > 0 && (
          <div className="bg-bg-card rounded-xl p-5 border border-border mt-6">
            <h3 className="text-sm font-semibold text-text-bright mb-3">Podsumowanie sesji</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-accent">{sessionStats.correct}</div>
                <div className="text-xs text-text-dim">Poprawne</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-danger">{sessionStats.incorrect}</div>
                <div className="text-xs text-text-dim">Błędne</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gold">{sessionStats.streak}</div>
                <div className="text-xs text-text-dim">Najlepsza seria</div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Learn new words mode
  if (mode === 'learn') {
    if (!currentNewVocab) {
      return (
        <div className="text-center py-12 animate-fade-in">
          <div className="text-4xl mb-4">🎉</div>
          <h2 className="text-xl font-bold text-text-bright">Brawo!</h2>
          <p className="text-text-dim mt-2">Przejrzałeś wszystkie dostępne słowa</p>
          {dueCards.length > 0 && (
            <button
              onClick={() => { setMode('review'); setCurrentIndex(0); }}
              className="mt-4 px-6 py-3 bg-accent text-bg font-semibold rounded-lg"
            >
              Wróć do powtórki
            </button>
          )}
        </div>
      );
    }

    return (
      <div className="animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-text-bright">Nowe słowo</h2>
          <div className="flex gap-2">
            {dueCards.length > 0 && (
              <button
                onClick={() => { setMode('review'); setCurrentIndex(0); }}
                className="px-4 py-2 text-sm bg-bg-hover text-text-dim rounded-lg hover:text-text"
              >
                Powtórka ({dueCards.length})
              </button>
            )}
            <span className="px-3 py-2 bg-bg-card text-text-dim text-sm rounded-lg">
              {newCardIndex + 1} / {newVocab.length}
            </span>
          </div>
        </div>

        <div className="bg-bg-card rounded-2xl p-8 border border-border text-center">
          <div className="text-3xl font-bold text-text-bright mb-2">{currentNewVocab.italian}</div>
          <button onClick={() => playAudio(currentNewVocab.italian)} className="text-accent text-sm hover:underline mb-4 block mx-auto">
            🔊 Posłuchaj
          </button>
          <div className="text-xl text-text mb-4">{currentNewVocab.polish}</div>
          <div className="text-sm text-text-dim mb-1">
            {currentNewVocab.partOfSpeech}
            {currentNewVocab.gender ? ` • ${currentNewVocab.gender === 'masculine' ? 'r. męski' : 'r. żeński'}` : ''}
          </div>
          <div className="bg-bg rounded-lg p-4 mt-4 text-left">
            <div className="text-sm text-accent italic">"{currentNewVocab.exampleIt}"</div>
            <div className="text-sm text-text-dim mt-1">"{currentNewVocab.examplePl}"</div>
          </div>
          <div className="mt-2 text-xs text-text-dim">Temat: {currentNewVocab.topic} • Poziom: {currentNewVocab.level}</div>
        </div>

        <button
          onClick={handleLearnNew}
          className="w-full mt-4 py-4 bg-accent text-bg font-bold text-lg rounded-xl hover:bg-accent-dim transition-colors"
        >
          Dodaj do fiszek i kontynuuj →
        </button>
      </div>
    );
  }

  // Review card
  if (!currentCard) return null;

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-text-bright">Powtórka SRS</h2>
        <div className="flex items-center gap-3">
          {sessionStats.streak >= 3 && (
            <span className="text-sm text-gold">🔥 {sessionStats.streak}</span>
          )}
          <span className="px-3 py-1 bg-bg-card text-text-dim text-sm rounded-lg border border-border">
            {currentIndex + 1} / {dueCards.length}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-bg-card rounded-full h-1.5 mb-6 overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex) / dueCards.length) * 100}%` }}
        />
      </div>

      {/* Card */}
      <div
        className="bg-bg-card rounded-2xl p-8 border border-border text-center min-h-[280px] flex flex-col justify-center cursor-pointer"
        onClick={() => !showAnswer && setShowAnswer(true)}
      >
        {/* Front: Italian */}
        <div className="text-3xl font-bold text-text-bright mb-3">{currentCard.italian}</div>
        <button
          onClick={(e) => { e.stopPropagation(); playAudio(currentCard.italian); }}
          className="text-accent text-sm hover:underline mb-4 mx-auto"
        >
          🔊 Posłuchaj
        </button>

        {currentCard.context && (
          <div className="text-xs text-text-dim mb-4 uppercase tracking-wide">{currentCard.context}</div>
        )}

        {!showAnswer ? (
          <div className="mt-4">
            <div className="text-text-dim text-sm">Kliknij, aby zobaczyć odpowiedź</div>
            <div className="text-text-dim text-xs mt-1">Box {currentCard.box} • Powtórzono {currentCard.totalReviews}x</div>
          </div>
        ) : (
          <div className="animate-fade-in mt-4 space-y-3">
            <div className="h-px bg-border" />
            <div className="text-2xl text-accent font-semibold">{currentCard.polish}</div>
            {currentCard.exampleSentence && (
              <div className="bg-bg rounded-lg p-3 text-left">
                <div className="text-sm italic text-text">"{currentCard.exampleSentence}"</div>
                {currentCard.exampleTranslation && (
                  <div className="text-sm text-text-dim mt-1">"{currentCard.exampleTranslation}"</div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Confidence buttons */}
      {showAnswer && (
        <div className="grid grid-cols-4 gap-2 mt-4 animate-slide-up">
          <ConfidenceButton rating={1} label="Nie wiem" color="bg-danger" onClick={() => handleConfidence(1)} />
          <ConfidenceButton rating={2} label="Trudne" color="bg-warning" onClick={() => handleConfidence(2)} />
          <ConfidenceButton rating={3} label="OK" color="bg-accent" onClick={() => handleConfidence(3)} />
          <ConfidenceButton rating={4} label="Łatwe" color="bg-info" onClick={() => handleConfidence(4)} />
        </div>
      )}

      {!showAnswer && (
        <button
          onClick={() => setShowAnswer(true)}
          className="w-full mt-4 py-4 bg-bg-card border border-border text-text rounded-xl hover:bg-bg-hover transition-colors font-medium"
        >
          Pokaż odpowiedź
        </button>
      )}
    </div>
  );
}

function ConfidenceButton({ rating, label, color, onClick }: {
  rating: number; label: string; color: string; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`${color} text-white py-3 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity`}
    >
      <div className="text-lg">{rating}</div>
      <div className="text-xs opacity-80">{label}</div>
    </button>
  );
}
