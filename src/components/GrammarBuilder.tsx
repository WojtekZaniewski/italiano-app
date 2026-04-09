import { useState } from 'react';
import type { GrammarLesson, CEFRLevel } from '../types';
import { speakItalian, isSpeechSupported } from '../engine/tts';

export function GrammarBuilder({ lessons, userLevel, onXp }: {
  lessons: GrammarLesson[];
  userLevel: CEFRLevel;
  onXp: (xp: number) => void;
}) {
  const [selectedLesson, setSelectedLesson] = useState<GrammarLesson | null>(null);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [completedExercises, setCompletedExercises] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const levelOrder: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  // Group lessons by level
  const lessonsByLevel = levelOrder.map(level => ({
    level,
    lessons: lessons.filter(l => l.level === level),
    unlocked: levelOrder.indexOf(level) <= levelOrder.indexOf(userLevel),
  }));

  if (!selectedLesson) {
    return (
      <div className="animate-fade-in">
        <h2 className="text-xl font-bold text-text-bright mb-2">Gramatyka</h2>
        <p className="text-text-dim text-sm mb-6">
          Metoda Michel Thomas — uczysz się przez budowanie zdań, nie przez tabelki.
        </p>

        <div className="space-y-6">
          {lessonsByLevel.map(({ level, lessons: lvlLessons, unlocked }) => (
            <div key={level}>
              <h3 className="text-sm font-semibold text-text-bright mb-3 flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-xs ${unlocked ? 'bg-accent/20 text-accent' : 'bg-bg-hover text-text-dim'}`}>
                  {level}
                </span>
                {!unlocked && <span className="text-xs text-text-dim">🔒 Zablokowane</span>}
              </h3>
              <div className="grid gap-2">
                {lvlLessons.map(lesson => (
                  <button
                    key={lesson.id}
                    onClick={() => unlocked && setSelectedLesson(lesson)}
                    disabled={!unlocked}
                    className={`text-left p-4 rounded-xl border transition-colors ${
                      unlocked
                        ? 'bg-bg-card border-border hover:bg-bg-hover cursor-pointer'
                        : 'bg-bg-card/50 border-border/50 cursor-not-allowed opacity-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-text-bright">{lesson.title}</div>
                        <div className="text-sm text-text-dim">{lesson.titlePl}</div>
                      </div>
                      <div className="text-xs text-text-dim">{lesson.buildingBlocks.length} ćwiczeń</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const exercise = selectedLesson.buildingBlocks[exerciseIndex];

  // All exercises done — show explanation
  if (!exercise || showExplanation) {
    return (
      <div className="animate-fade-in">
        <button
          onClick={() => { setSelectedLesson(null); setExerciseIndex(0); setShowExplanation(false); setCompletedExercises(0); }}
          className="text-text-dim hover:text-text text-sm mb-6 flex items-center gap-1"
        >
          ← Powrót do listy
        </button>

        <div className="bg-bg-card rounded-2xl p-6 border border-border">
          <h3 className="text-lg font-bold text-text-bright mb-2">{selectedLesson.title}</h3>
          <h4 className="text-sm text-accent mb-4">Wyjaśnienie reguły</h4>

          <div className="space-y-4">
            <div className="bg-bg rounded-lg p-4">
              <div className="text-sm text-text whitespace-pre-line">{selectedLesson.explanation}</div>
            </div>
            <div className="bg-bg rounded-lg p-4">
              <div className="text-xs text-text-dim uppercase tracking-wide mb-2">Po polsku</div>
              <div className="text-sm text-text whitespace-pre-line">{selectedLesson.explanationPl}</div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/30">
            <div className="text-sm text-accent">
              Ukończono {completedExercises}/{selectedLesson.buildingBlocks.length} ćwiczeń
            </div>
          </div>
        </div>

        <button
          onClick={() => { setSelectedLesson(null); setExerciseIndex(0); setShowExplanation(false); setCompletedExercises(0); }}
          className="w-full mt-4 py-3 bg-accent text-bg font-semibold rounded-xl hover:bg-accent-dim"
        >
          Wróć do lekcji
        </button>
      </div>
    );
  }

  const checkAnswer = () => {
    const normalized = userAnswer.trim().toLowerCase().replace(/[?.!,;]/g, '');
    const correct = exercise.answer.toLowerCase().replace(/[?.!,;]/g, '');
    const match = normalized === correct;
    setIsCorrect(match);
    setShowResult(true);
    if (match) {
      onXp(15);
      setCompletedExercises(c => c + 1);
    }
  };

  const nextExercise = () => {
    setUserAnswer('');
    setShowResult(false);
    setShowHint(false);
    if (exerciseIndex < selectedLesson.buildingBlocks.length - 1) {
      setExerciseIndex(i => i + 1);
    } else {
      setShowExplanation(true);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => { setSelectedLesson(null); setExerciseIndex(0); setShowExplanation(false); }}
          className="text-text-dim hover:text-text text-sm"
        >
          ← Powrót
        </button>
        <span className="text-sm text-text-dim">
          {exerciseIndex + 1}/{selectedLesson.buildingBlocks.length}
        </span>
      </div>

      <div className="w-full bg-bg-card rounded-full h-1.5 mb-6 overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-all"
          style={{ width: `${(exerciseIndex / selectedLesson.buildingBlocks.length) * 100}%` }}
        />
      </div>

      <div className="bg-bg-card rounded-2xl p-6 border border-border">
        <div className="text-xs text-text-dim uppercase tracking-wide mb-2">{selectedLesson.title}</div>
        <div className="text-lg text-text-bright mb-6 leading-relaxed">{exercise.prompt}</div>

        {/* Building blocks hint */}
        {showHint && exercise.hint && (
          <div className="bg-bg rounded-lg p-3 mb-4 text-sm text-text-dim animate-fade-in">
            💡 {exercise.hint}
          </div>
        )}

        {!showHint && exercise.hint && !showResult && (
          <button
            onClick={() => setShowHint(true)}
            className="text-xs text-text-dim hover:text-text mb-4"
          >
            Pokaż podpowiedź
          </button>
        )}

        {/* Components */}
        <div className="flex flex-wrap gap-2 mb-4">
          {exercise.components.map((comp, i) => (
            <span key={i} className="px-3 py-1 bg-bg rounded-lg text-sm text-accent border border-accent/20">
              {comp}
            </span>
          ))}
        </div>

        {/* Input */}
        <input
          type="text"
          value={userAnswer}
          onChange={e => setUserAnswer(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !showResult && checkAnswer()}
          placeholder="Wpisz odpowiedź po włosku..."
          disabled={showResult}
          className="w-full px-4 py-3 bg-bg-input border border-border rounded-xl text-text placeholder-text-dim focus:outline-none focus:border-accent"
          autoFocus
        />

        {/* Result */}
        {showResult && (
          <div className={`mt-4 p-4 rounded-lg animate-fade-in ${isCorrect ? 'bg-accent/10 border border-accent/30' : 'bg-danger/10 border border-danger/30'}`}>
            {isCorrect ? (
              <div className="text-accent font-semibold">✓ Perfetto!</div>
            ) : (
              <div>
                <div className="text-danger font-semibold mb-1">✗ Poprawna odpowiedź:</div>
                <div className="text-text-bright text-lg">{exercise.answer}</div>
              </div>
            )}
            {isSpeechSupported() && (
              <button
                onClick={() => speakItalian(exercise.answer)}
                className="mt-2 text-sm text-text-dim hover:text-text"
              >
                🔊 Posłuchaj wymowy
              </button>
            )}
          </div>
        )}
      </div>

      {!showResult ? (
        <button
          onClick={checkAnswer}
          disabled={!userAnswer.trim()}
          className={`w-full mt-4 py-4 font-bold rounded-xl transition-colors ${
            userAnswer.trim()
              ? 'bg-accent text-bg hover:bg-accent-dim'
              : 'bg-bg-card text-text-dim border border-border cursor-not-allowed'
          }`}
        >
          Sprawdź
        </button>
      ) : (
        <button
          onClick={nextExercise}
          className="w-full mt-4 py-4 bg-accent text-bg font-bold rounded-xl hover:bg-accent-dim transition-colors"
        >
          {exerciseIndex < selectedLesson.buildingBlocks.length - 1 ? 'Następne →' : 'Zobacz wyjaśnienie →'}
        </button>
      )}
    </div>
  );
}
