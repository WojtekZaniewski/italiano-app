import { useState } from 'react';
import type { PlacementQuestion, CEFRLevel } from '../types';
import { speakItalian, isSpeechSupported } from '../engine/tts';

export function PlacementTest({ questions, onComplete }: {
  questions: PlacementQuestion[];
  onComplete: (level: CEFRLevel, score: number) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [started, setStarted] = useState(false);

  if (!started) {
    return (
      <div className="animate-fade-in text-center py-12">
        <div className="text-5xl mb-6">📝</div>
        <h2 className="text-2xl font-bold text-text-bright mb-3">Test poziomujący</h2>
        <p className="text-text-dim max-w-md mx-auto mb-2">
          50 pytań adaptacyjnych sprawdzających słownictwo, gramatykę i tłumaczenie.
        </p>
        <p className="text-text-dim text-sm max-w-md mx-auto mb-8">
          Test określi Twój poziom od A1 do C2 i dostosuje trudność wszystkich modułów.
          Odpowiadaj najlepiej jak potrafisz — nie zgaduj.
        </p>
        <button
          onClick={() => setStarted(true)}
          className="px-8 py-4 bg-accent text-bg font-bold text-lg rounded-xl hover:bg-accent-dim transition-colors"
        >
          Rozpocznij test
        </button>
      </div>
    );
  }

  const question = questions[currentIndex];

  if (showResult || !question) {
    const score = answers.reduce((sum, ans, i) => {
      return sum + (ans === questions[i].correctIndex ? questions[i].points : 0);
    }, 0);

    const maxScore = questions.reduce((sum, q) => sum + q.points, 0);
    const pct = score / maxScore;

    let level: CEFRLevel;
    if (pct >= 0.9) level = 'C2';
    else if (pct >= 0.75) level = 'C1';
    else if (pct >= 0.60) level = 'B2';
    else if (pct >= 0.45) level = 'B1';
    else if (pct >= 0.25) level = 'A2';
    else level = 'A1';

    const correctCount = answers.filter((a, i) => a === questions[i].correctIndex).length;

    return (
      <div className="animate-slide-up text-center py-8">
        <div className="text-5xl mb-4">🎯</div>
        <h2 className="text-2xl font-bold text-text-bright mb-2">Wynik testu</h2>
        <div className="bg-bg-card rounded-2xl p-8 border border-border max-w-sm mx-auto mt-6">
          <div className="text-6xl font-bold text-accent mb-2">{level}</div>
          <div className="text-text-dim mb-4">Twój poziom językowy</div>
          <div className="grid grid-cols-2 gap-4 text-center border-t border-border pt-4">
            <div>
              <div className="text-xl font-bold text-text-bright">{correctCount}/{questions.length}</div>
              <div className="text-xs text-text-dim">Poprawne odpowiedzi</div>
            </div>
            <div>
              <div className="text-xl font-bold text-text-bright">{score}/{maxScore}</div>
              <div className="text-xs text-text-dim">Punkty</div>
            </div>
          </div>
        </div>
        <button
          onClick={() => onComplete(level, score)}
          className="mt-8 px-8 py-4 bg-accent text-bg font-bold rounded-xl hover:bg-accent-dim transition-colors"
        >
          Rozpocznij naukę na poziomie {level}
        </button>
      </div>
    );
  }

  const handleAnswer = () => {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setSelected(null);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-text-bright">Test poziomujący</h2>
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 bg-bg-card text-xs rounded border border-border">{question.level}</span>
          <span className="text-sm text-text-dim">{currentIndex + 1}/{questions.length}</span>
        </div>
      </div>

      <div className="w-full bg-bg-card rounded-full h-1.5 mb-6 overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-all duration-300"
          style={{ width: `${(currentIndex / questions.length) * 100}%` }}
        />
      </div>

      <div className="bg-bg-card rounded-2xl p-6 border border-border">
        <div className="text-xs text-text-dim uppercase tracking-wide mb-3">
          {question.type === 'vocab' ? 'Słownictwo' :
           question.type === 'grammar' ? 'Gramatyka' :
           question.type === 'translation' ? 'Tłumaczenie' : 'Słuchanie'}
        </div>

        <div className="text-lg text-text-bright mb-6 leading-relaxed">{question.question}</div>

        {question.type === 'listening' && isSpeechSupported() && (
          <button
            onClick={() => speakItalian(question.question.replace(/.*"(.+)".*/, '$1'))}
            className="mb-4 px-4 py-2 bg-bg rounded-lg text-accent text-sm hover:bg-bg-hover"
          >
            🔊 Posłuchaj jeszcze raz
          </button>
        )}

        <div className="space-y-2">
          {question.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${
                selected === i
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-border bg-bg hover:bg-bg-hover text-text'
              }`}
            >
              <span className="text-text-dim mr-3">{String.fromCharCode(65 + i)}.</span>
              {opt}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleAnswer}
        disabled={selected === null}
        className={`w-full mt-4 py-4 font-bold text-lg rounded-xl transition-colors ${
          selected !== null
            ? 'bg-accent text-bg hover:bg-accent-dim'
            : 'bg-bg-card text-text-dim cursor-not-allowed border border-border'
        }`}
      >
        {currentIndex < questions.length - 1 ? 'Następne pytanie →' : 'Zakończ test'}
      </button>
    </div>
  );
}
