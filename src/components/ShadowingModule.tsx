import { useState, useRef } from 'react';
import type { CEFRLevel } from '../types';
import { speakItalian, isSpeechSupported, startSpeechRecognition } from '../engine/tts';

interface ShadowingClip {
  id: string;
  text: string;
  translation: string;
  level: CEFRLevel;
  words: string[];
}

const SHADOWING_CLIPS: ShadowingClip[] = [
  // A1
  { id: 's1', text: 'Buongiorno, come stai?', translation: 'Dzień dobry, jak się masz?', level: 'A1', words: ['buongiorno', 'come', 'stai'] },
  { id: 's2', text: 'Mi chiamo Marco e sono italiano.', translation: 'Nazywam się Marco i jestem Włochem.', level: 'A1', words: ['mi', 'chiamo', 'marco', 'e', 'sono', 'italiano'] },
  { id: 's3', text: 'Vorrei un caffè, per favore.', translation: 'Poproszę kawę.', level: 'A1', words: ['vorrei', 'un', 'caffè', 'per', 'favore'] },
  { id: 's4', text: 'Dove si trova la stazione?', translation: 'Gdzie jest stacja?', level: 'A1', words: ['dove', 'si', 'trova', 'la', 'stazione'] },
  { id: 's5', text: 'Oggi fa molto caldo.', translation: 'Dzisiaj jest bardzo gorąco.', level: 'A1', words: ['oggi', 'fa', 'molto', 'caldo'] },
  // A2
  { id: 's6', text: 'Ieri sono andato al cinema con i miei amici.', translation: 'Wczoraj poszedłem do kina z moimi przyjaciółmi.', level: 'A2', words: ['ieri', 'sono', 'andato', 'al', 'cinema', 'con', 'i', 'miei', 'amici'] },
  { id: 's7', text: 'Potrebbe ripetere più lentamente, per cortesia?', translation: 'Czy mógłby Pan powtórzyć wolniej?', level: 'A2', words: ['potrebbe', 'ripetere', 'più', 'lentamente', 'per', 'cortesia'] },
  { id: 's8', text: 'Mi piace molto la cucina italiana, specialmente la pasta.', translation: 'Bardzo lubię kuchnię włoską, szczególnie makaron.', level: 'A2', words: ['mi', 'piace', 'molto', 'la', 'cucina', 'italiana', 'specialmente', 'la', 'pasta'] },
  { id: 's9', text: 'Quanto costa questo vestito? È troppo caro.', translation: 'Ile kosztuje ta sukienka? Jest za droga.', level: 'A2', words: ['quanto', 'costa', 'questo', 'vestito', 'è', 'troppo', 'caro'] },
  { id: 's10', text: 'Devo prendere l\'autobus numero cinque per andare in centro.', translation: 'Muszę wziąć autobus numer pięć, żeby jechać do centrum.', level: 'A2', words: ['devo', 'prendere', 'autobus', 'numero', 'cinque', 'per', 'andare', 'in', 'centro'] },
  // B1
  { id: 's11', text: 'Se avessi più tempo, viaggerei per tutta l\'Italia.', translation: 'Gdybym miał więcej czasu, podróżowałbym po całych Włoszech.', level: 'B1', words: ['se', 'avessi', 'più', 'tempo', 'viaggerei', 'per', 'tutta', 'italia'] },
  { id: 's12', text: 'Nonostante la pioggia, abbiamo deciso di fare una passeggiata nel parco.', translation: 'Pomimo deszczu, zdecydowaliśmy się na spacer w parku.', level: 'B1', words: ['nonostante', 'la', 'pioggia', 'abbiamo', 'deciso', 'di', 'fare', 'una', 'passeggiata', 'nel', 'parco'] },
  { id: 's13', text: 'È importante che tutti partecipino alla discussione in modo costruttivo.', translation: 'Ważne jest, żeby wszyscy uczestniczyli w dyskusji w sposób konstruktywny.', level: 'B1', words: ['è', 'importante', 'che', 'tutti', 'partecipino', 'alla', 'discussione', 'in', 'modo', 'costruttivo'] },
  // B2
  { id: 's14', text: 'La globalizzazione ha portato sia vantaggi che svantaggi alle economie dei paesi in via di sviluppo.', translation: 'Globalizacja przyniosła zarówno korzyści, jak i wady gospodarkom krajów rozwijających się.', level: 'B2', words: ['la', 'globalizzazione', 'ha', 'portato', 'sia', 'vantaggi', 'che', 'svantaggi', 'alle', 'economie', 'dei', 'paesi'] },
  { id: 's15', text: 'Secondo me, il sistema educativo dovrebbe essere riformato per adattarsi alle esigenze del ventunesimo secolo.', translation: 'Moim zdaniem, system edukacji powinien zostać zreformowany, aby dostosować się do potrzeb XXI wieku.', level: 'B2', words: ['secondo', 'me', 'il', 'sistema', 'educativo', 'dovrebbe', 'essere', 'riformato'] },
  // C1
  { id: 's16', text: 'L\'analisi approfondita dei dati suggerisce che le politiche ambientali adottate finora si sono rivelate insufficienti nel contrastare il cambiamento climatico.', translation: 'Dogłębna analiza danych sugeruje, że dotychczas przyjęte polityki środowiskowe okazały się niewystarczające w przeciwdziałaniu zmianom klimatycznym.', level: 'C1', words: ['analisi', 'approfondita', 'dei', 'dati', 'suggerisce', 'politiche', 'ambientali', 'insufficienti', 'cambiamento', 'climatico'] },
];

export function ShadowingModule({ userLevel, onXp }: {
  userLevel: CEFRLevel;
  onXp: (xp: number) => void;
}) {
  const [selectedClip, setSelectedClip] = useState<ShadowingClip | null>(null);
  const [phase, setPhase] = useState<'listen' | 'record' | 'result'>('listen');
  const [userTranscript, setUserTranscript] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [matchedWords, setMatchedWords] = useState<string[]>([]);
  const [missedWords, setMissedWords] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const recRef = useRef<{ stop: () => void } | null>(null);

  const levelOrder: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const availableClips = SHADOWING_CLIPS.filter(c => levelOrder.indexOf(c.level) <= levelOrder.indexOf(userLevel));

  if (!selectedClip) {
    return (
      <div className="animate-fade-in">
        <h2 className="text-xl font-bold text-text-bright mb-2">Shadowing</h2>
        <p className="text-text-dim text-sm mb-6">
          Metoda Arguellesa — powtarzaj z opóźnieniem 0.5s za native speakerem. Buduje akcent, rytm i intonację.
        </p>

        <div className="space-y-2">
          {availableClips.map(clip => (
            <button
              key={clip.id}
              onClick={() => { setSelectedClip(clip); setPhase('listen'); }}
              className="w-full text-left p-4 rounded-xl border border-border bg-bg-card hover:bg-bg-hover transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-text-bright">{clip.text}</div>
                  <div className="text-sm text-text-dim mt-1">{clip.translation}</div>
                </div>
                <span className="px-2 py-0.5 rounded text-xs bg-accent/20 text-accent shrink-0 ml-3">{clip.level}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const playClip = async () => {
    setIsPlaying(true);
    try {
      await speakItalian(selectedClip.text, 0.9);
    } catch {}
    setIsPlaying(false);
  };

  const startRecording = () => {
    const rec = startSpeechRecognition(
      (text, conf) => {
        setUserTranscript(text);
        setConfidence(conf);
        analyzeResult(text);
        setIsRecording(false);
      },
      () => setIsRecording(false),
    );
    if (rec) {
      recRef.current = rec;
      setIsRecording(true);
    }
  };

  const analyzeResult = (transcript: string) => {
    const userWords = transcript.toLowerCase().split(/\s+/).map(w => w.replace(/[.,!?]/g, ''));
    const targetWords = selectedClip.words.map(w => w.toLowerCase());
    const matched = targetWords.filter(w => userWords.includes(w));
    const missed = targetWords.filter(w => !userWords.includes(w));
    setMatchedWords(matched);
    setMissedWords(missed);
    setPhase('result');
  };

  const score = selectedClip.words.length > 0
    ? Math.round((matchedWords.length / selectedClip.words.length) * 100)
    : 0;

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => { setSelectedClip(null); setPhase('listen'); setUserTranscript(''); }} className="text-text-dim hover:text-text text-sm">
          ← Powrót
        </button>
        <span className="px-2 py-0.5 bg-bg-card text-xs rounded border border-border">{selectedClip.level}</span>
      </div>

      <div className="bg-bg-card rounded-2xl p-6 border border-border">
        {/* Target sentence */}
        <div className="text-center mb-6">
          <div className="text-xl text-text-bright mb-2">{selectedClip.text}</div>
          <div className="text-sm text-text-dim">{selectedClip.translation}</div>
        </div>

        {/* Phase: Listen */}
        {phase === 'listen' && (
          <div className="text-center space-y-4">
            <p className="text-sm text-text-dim">Krok 1: Posłuchaj uważnie</p>
            <button
              onClick={playClip}
              disabled={isPlaying}
              className={`px-8 py-4 rounded-xl text-lg font-semibold transition-colors ${
                isPlaying ? 'bg-accent/30 text-accent animate-pulse' : 'bg-accent text-bg hover:bg-accent-dim'
              }`}
            >
              {isPlaying ? '🔊 Odtwarzanie...' : '🔊 Posłuchaj'}
            </button>
            <div>
              <button
                onClick={() => setPhase('record')}
                className="mt-4 px-6 py-3 bg-bg border border-border rounded-xl text-text hover:bg-bg-hover"
              >
                Gotowy do nagrywania →
              </button>
            </div>
          </div>
        )}

        {/* Phase: Record */}
        {phase === 'record' && (
          <div className="text-center space-y-4">
            <p className="text-sm text-text-dim">Krok 2: Powtórz z opóźnieniem ~0.5s</p>
            {isSpeechSupported() && (
              <button
                onClick={playClip}
                className="text-sm text-accent hover:underline"
              >
                🔊 Posłuchaj ponownie
              </button>
            )}
            <div>
              <button
                onClick={isRecording ? () => recRef.current?.stop() : startRecording}
                className={`px-8 py-4 rounded-full text-lg font-semibold transition-all ${
                  isRecording
                    ? 'bg-danger text-white animate-pulse-glow scale-110'
                    : 'bg-danger/80 text-white hover:bg-danger'
                }`}
              >
                {isRecording ? '⏹ Nagrywanie...' : '🎤 Nagraj'}
              </button>
            </div>
            <p className="text-xs text-text-dim">Kliknij mikrofon i powtórz zdanie po włosku</p>

            {/* Manual input fallback */}
            <div className="pt-4 border-t border-border">
              <p className="text-xs text-text-dim mb-2">Lub wpisz ręcznie:</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userTranscript}
                  onChange={e => setUserTranscript(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && userTranscript.trim() && analyzeResult(userTranscript)}
                  placeholder="Wpisz po włosku..."
                  className="flex-1 px-4 py-2 bg-bg-input border border-border rounded-lg text-text text-sm focus:outline-none focus:border-accent"
                />
                <button
                  onClick={() => userTranscript.trim() && analyzeResult(userTranscript)}
                  disabled={!userTranscript.trim()}
                  className="px-4 py-2 bg-accent text-bg rounded-lg text-sm font-semibold hover:bg-accent-dim disabled:opacity-50"
                >
                  Sprawdź
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Phase: Result */}
        {phase === 'result' && (
          <div className="space-y-4 animate-fade-in">
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-1">{score}%</div>
              <div className="text-text-dim text-sm">dopasowanie słów</div>
            </div>

            {userTranscript && (
              <div className="bg-bg rounded-lg p-4">
                <div className="text-xs text-text-dim uppercase mb-2">Twoja wypowiedź</div>
                <div className="text-text-bright">{userTranscript}</div>
                {confidence > 0 && (
                  <div className="text-xs text-text-dim mt-1">Pewność rozpoznania: {Math.round(confidence * 100)}%</div>
                )}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-accent/10 rounded-lg p-3 border border-accent/30">
                <div className="text-xs text-accent uppercase mb-2">Trafione ({matchedWords.length})</div>
                <div className="flex flex-wrap gap-1">
                  {matchedWords.map((w, i) => (
                    <span key={i} className="px-2 py-0.5 bg-accent/20 rounded text-xs text-accent">{w}</span>
                  ))}
                </div>
              </div>
              <div className="bg-danger/10 rounded-lg p-3 border border-danger/30">
                <div className="text-xs text-danger uppercase mb-2">Pominięte ({missedWords.length})</div>
                <div className="flex flex-wrap gap-1">
                  {missedWords.map((w, i) => (
                    <span key={i} className="px-2 py-0.5 bg-danger/20 rounded text-xs text-danger">{w}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {phase === 'result' && (
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => { setPhase('listen'); setUserTranscript(''); setMatchedWords([]); setMissedWords([]); }}
            className="flex-1 py-3 bg-bg-card border border-border rounded-xl text-text hover:bg-bg-hover font-medium"
          >
            Spróbuj ponownie
          </button>
          <button
            onClick={() => { setSelectedClip(null); setPhase('listen'); setUserTranscript(''); onXp(20); }}
            className="flex-1 py-3 bg-accent text-bg rounded-xl font-semibold hover:bg-accent-dim"
          >
            Następny klip →
          </button>
        </div>
      )}
    </div>
  );
}
