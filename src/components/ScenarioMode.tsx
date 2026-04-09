import { useState, useEffect, useRef } from 'react';
import type { Scenario, CEFRLevel, DialogueStep } from '../types';
import { speakItalian, isSpeechSupported, startSpeechRecognition } from '../engine/tts';

export function ScenarioMode({ scenarios, userLevel, onXp }: {
  scenarios: Scenario[];
  userLevel: CEFRLevel;
  onXp: (xp: number) => void;
}) {
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [stepResults, setStepResults] = useState<Array<{ correct: boolean; response: string }>>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const levelOrder: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  // Group scenarios by level
  const byLevel = levelOrder.map(level => ({
    level,
    scenarios: scenarios.filter(s => s.level === level),
    unlocked: levelOrder.indexOf(level) <= levelOrder.indexOf(userLevel),
  }));

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  if (!selectedScenario) {
    return (
      <div className="animate-fade-in">
        <h2 className="text-xl font-bold text-text-bright mb-2">Scenariusze</h2>
        <p className="text-text-dim text-sm mb-6">
          Metoda CIA/DLI — realistyczne sytuacje z presją czasu. Odpowiadaj po włosku!
        </p>

        <div className="space-y-6">
          {byLevel.map(({ level, scenarios: lvlScenarios, unlocked }) => (
            lvlScenarios.length > 0 && (
              <div key={level}>
                <h3 className="text-sm font-semibold text-text-bright mb-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${unlocked ? 'bg-accent/20 text-accent' : 'bg-bg-hover text-text-dim'}`}>
                    {level}
                  </span>
                </h3>
                <div className="grid gap-2">
                  {lvlScenarios.map(scenario => (
                    <button
                      key={scenario.id}
                      onClick={() => {
                        if (!unlocked) return;
                        setSelectedScenario(scenario);
                        setStepIndex(0);
                        setStepResults([]);
                        startStep(scenario.dialogueSteps[0]);
                      }}
                      disabled={!unlocked}
                      className={`text-left p-4 rounded-xl border transition-colors ${
                        unlocked
                          ? 'bg-bg-card border-border hover:bg-bg-hover'
                          : 'bg-bg-card/50 border-border/50 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div className="font-medium text-text-bright">{scenario.title}</div>
                      <div className="text-sm text-text-dim">{scenario.titlePl}</div>
                      <div className="text-xs text-text-dim mt-1">{scenario.description}</div>
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

  const step = selectedScenario.dialogueSteps[stepIndex];

  function startStep(s: DialogueStep) {
    if (s.speaker === 'ai') {
      if (isSpeechSupported()) speakItalian(s.text);
      setTimeLeft(0);
    } else {
      setTimeLeft(s.timeLimit ?? 15);
      setShowHint(false);
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(timerRef.current!);
            setShowHint(true);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
  }

  // Scenario complete
  if (!step) {
    const correct = stepResults.filter(r => r.correct).length;
    const total = stepResults.length;
    const score = Math.round((correct / Math.max(total, 1)) * 100);

    return (
      <div className="animate-slide-up text-center py-8">
        <div className="text-5xl mb-4">{score >= 80 ? '🏆' : score >= 50 ? '👏' : '💪'}</div>
        <h2 className="text-2xl font-bold text-text-bright mb-2">Scenariusz ukończony!</h2>
        <p className="text-text-dim mb-6">{selectedScenario.title}</p>

        <div className="bg-bg-card rounded-2xl p-6 border border-border max-w-sm mx-auto">
          <div className="text-4xl font-bold text-accent mb-1">{score}%</div>
          <div className="text-text-dim text-sm mb-4">{correct}/{total} poprawnych odpowiedzi</div>

          <div className="space-y-2">
            {stepResults.map((r, i) => (
              <div key={i} className={`text-sm px-3 py-2 rounded-lg ${r.correct ? 'bg-accent/10 text-accent' : 'bg-danger/10 text-danger'}`}>
                {r.correct ? '✓' : '✗'} {r.response}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => { setSelectedScenario(null); onXp(score >= 80 ? 100 : 50); }}
          className="mt-6 px-8 py-3 bg-accent text-bg font-bold rounded-xl hover:bg-accent-dim"
        >
          Powrót do listy
        </button>
      </div>
    );
  }

  // AI speaks
  if (step.speaker === 'ai') {
    return (
      <div className="animate-fade-in">
        <ScenarioHeader scenario={selectedScenario} stepIndex={stepIndex} onBack={() => setSelectedScenario(null)} />

        <div className="bg-bg-card rounded-2xl p-6 border border-border">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-info/20 flex items-center justify-center text-info shrink-0">AI</div>
            <div>
              <div className="text-text-bright text-lg">{step.text}</div>
              <div className="text-text-dim text-sm mt-1">{step.translation}</div>
            </div>
          </div>

          {isSpeechSupported() && (
            <button
              onClick={() => speakItalian(step.text)}
              className="text-sm text-accent hover:underline"
            >
              🔊 Powtórz
            </button>
          )}
        </div>

        <button
          onClick={() => {
            const next = stepIndex + 1;
            setStepIndex(next);
            if (selectedScenario.dialogueSteps[next]) {
              startStep(selectedScenario.dialogueSteps[next]);
            }
          }}
          className="w-full mt-4 py-4 bg-accent text-bg font-bold rounded-xl hover:bg-accent-dim"
        >
          Kontynuuj →
        </button>
      </div>
    );
  }

  // User's turn
  const checkResponse = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    const input = userInput.trim().toLowerCase();
    const acceptable = step.acceptableResponses || [step.text.toLowerCase()];
    const correct = acceptable.some(r => {
      const pattern = r.toLowerCase();
      return input === pattern || input.includes(pattern) || pattern.includes(input);
    });

    setStepResults([...stepResults, { correct, response: userInput }]);
    setShowResult(true);
  };

  const handleSpeech = () => {
    const rec = startSpeechRecognition(
      (text) => {
        setUserInput(text);
        setIsRecording(false);
      },
      () => setIsRecording(false),
    );
    if (rec) setIsRecording(true);
  };

  return (
    <div className="animate-fade-in">
      <ScenarioHeader scenario={selectedScenario} stepIndex={stepIndex} onBack={() => setSelectedScenario(null)} />

      <div className="bg-bg-card rounded-2xl p-6 border border-border">
        {/* Timer */}
        {timeLeft > 0 && !showResult && (
          <div className={`text-center mb-4 ${timeLeft <= 3 ? 'text-danger animate-pulse' : 'text-text-dim'}`}>
            <span className="text-2xl font-mono font-bold">{timeLeft}s</span>
          </div>
        )}

        <div className="text-sm text-text-dim mb-2">Twoja kolej — odpowiedz po włosku:</div>
        <div className="text-text mb-4 text-sm bg-bg rounded-lg p-3">{step.translation}</div>

        {showHint && !showResult && (step.hints?.length || step.hint) && (
          <div className="bg-warning/10 border border-warning/30 rounded-lg p-3 mb-4 text-sm text-warning animate-fade-in">
            💡 {step.hints?.[0] ?? step.hint}
          </div>
        )}

        <div className="flex gap-2">
          <input
            type="text"
            value={userInput}
            onChange={e => setUserInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !showResult && checkResponse()}
            placeholder="Wpisz lub mów po włosku..."
            disabled={showResult}
            className="flex-1 px-4 py-3 bg-bg-input border border-border rounded-xl text-text placeholder-text-dim focus:outline-none focus:border-accent"
            autoFocus
          />
          {!showResult && (
            <button
              onClick={handleSpeech}
              className={`px-4 py-3 rounded-xl border transition-colors ${
                isRecording ? 'bg-danger/20 border-danger text-danger' : 'bg-bg border-border text-text-dim hover:text-text'
              }`}
            >
              🎤
            </button>
          )}
        </div>

        {showResult && (
          <div className={`mt-4 p-4 rounded-lg animate-fade-in ${
            stepResults[stepResults.length - 1]?.correct ? 'bg-accent/10 border border-accent/30' : 'bg-danger/10 border border-danger/30'
          }`}>
            {stepResults[stepResults.length - 1]?.correct ? (
              <div className="text-accent font-semibold">✓ Bene!</div>
            ) : (
              <div>
                <div className="text-danger font-semibold mb-1">Oczekiwana odpowiedź:</div>
                <div className="text-text-bright">{step.text}</div>
              </div>
            )}
          </div>
        )}
      </div>

      {!showResult ? (
        <button
          onClick={checkResponse}
          disabled={!userInput.trim()}
          className={`w-full mt-4 py-4 font-bold rounded-xl transition-colors ${
            userInput.trim() ? 'bg-accent text-bg hover:bg-accent-dim' : 'bg-bg-card text-text-dim border border-border cursor-not-allowed'
          }`}
        >
          Sprawdź
        </button>
      ) : (
        <button
          onClick={() => {
            setShowResult(false);
            setUserInput('');
            setShowHint(false);
            const next = stepIndex + 1;
            setStepIndex(next);
            if (selectedScenario.dialogueSteps[next]) {
              startStep(selectedScenario.dialogueSteps[next]);
            }
          }}
          className="w-full mt-4 py-4 bg-accent text-bg font-bold rounded-xl hover:bg-accent-dim"
        >
          Kontynuuj →
        </button>
      )}
    </div>
  );
}

function ScenarioHeader({ scenario, stepIndex, onBack }: { scenario: Scenario; stepIndex: number; onBack: () => void }) {
  const totalSteps = scenario.dialogueSteps.length;
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <button onClick={onBack} className="text-text-dim hover:text-text text-sm">← Powrót</button>
        <span className="text-sm text-text-dim">{stepIndex + 1}/{totalSteps}</span>
      </div>
      <div className="text-lg font-semibold text-text-bright">{scenario.title}</div>
      <div className="text-sm text-text-dim">{scenario.setting}</div>
      <div className="w-full bg-bg-card rounded-full h-1.5 mt-3 overflow-hidden">
        <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${(stepIndex / totalSteps) * 100}%` }} />
      </div>
    </div>
  );
}
