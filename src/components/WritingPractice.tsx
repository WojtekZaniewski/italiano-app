import { useState, useEffect } from 'react';
import type { CEFRLevel } from '../types';

interface Correction {
  original: string;
  corrected: string;
  explanation: string;
  type: 'grammar' | 'spelling' | 'word_choice' | 'style';
  patternId: string;
}

// Error pattern tracking (stored in localStorage)
const ERROR_STORAGE_KEY = 'italiano_writing_errors';

interface ErrorRecord {
  patternId: string;
  label: string;
  type: Correction['type'];
  count: number;
  lastSeen: string;
}

function loadErrorRecords(): ErrorRecord[] {
  try {
    return JSON.parse(localStorage.getItem(ERROR_STORAGE_KEY) || '[]');
  } catch { return []; }
}

function saveErrorRecords(records: ErrorRecord[]): void {
  localStorage.setItem(ERROR_STORAGE_KEY, JSON.stringify(records));
  window.dispatchEvent(new Event('italiano_data_changed'));
}

function trackErrors(corrections: Correction[]): void {
  const records = loadErrorRecords();
  const today = new Date().toISOString().split('T')[0];
  for (const c of corrections) {
    const existing = records.find(r => r.patternId === c.patternId);
    if (existing) {
      existing.count += 1;
      existing.lastSeen = today;
    } else {
      records.push({ patternId: c.patternId, label: c.explanation.split(' ')[0] + ' ' + c.explanation.split(' ')[1], type: c.type, count: 1, lastSeen: today });
    }
  }
  saveErrorRecords(records);
}

// Simple rule-based Italian text correction
function analyzeItalianText(text: string, level: CEFRLevel): { corrected: string; corrections: Correction[]; score: number; suggestions: string[] } {
  const corrections: Correction[] = [];
  let corrected = text;
  const suggestions: string[] = [];

  // Common error patterns (Polish → Italian interference)
  const errorPatterns: Array<{ id: string; pattern: RegExp; replacement: string; explanation: string; type: Correction['type'] }> = [
    { id: 'pp_essere_inf', pattern: /\bio\s+sono\s+andare\b/gi, replacement: 'io sono andato', explanation: 'Po "essere" w passato prossimo używamy participio passato (andato), nie bezokolicznika', type: 'grammar' },
    { id: 'pp_andare_avere', pattern: /\bho\s+andato\b/gi, replacement: 'sono andato', explanation: 'Czasownik "andare" w passato prossimo wymaga posiłkowego "essere", nie "avere"', type: 'grammar' },
    { id: 'pp_venire_avere', pattern: /\bho\s+venuto\b/gi, replacement: 'sono venuto', explanation: '"Venire" w passato prossimo → "essere": sono venuto', type: 'grammar' },
    { id: 'pp_uscire_avere', pattern: /\bho\s+uscito\b/gi, replacement: 'sono uscito', explanation: '"Uscire" w passato prossimo → "essere": sono uscito', type: 'grammar' },
    { id: 'accent_piu', pattern: /\bpiu\b/g, replacement: 'più', explanation: 'Słowo "più" (więcej) wymaga akcentu na "u"', type: 'spelling' },
    { id: 'accent_perche', pattern: /\bperche\b/g, replacement: 'perché', explanation: '"Perché" (dlaczego/ponieważ) wymaga akcentu', type: 'spelling' },
    { id: 'accent_citta', pattern: /\bcitta\b/g, replacement: 'città', explanation: '"Città" (miasto) wymaga akcentu na ostatniej sylabie', type: 'spelling' },
    { id: 'accent_univ', pattern: /\buniversita\b/g, replacement: 'università', explanation: '"Università" wymaga akcentu', type: 'spelling' },
    { id: 'accent_caffe', pattern: /\bcaffe\b/g, replacement: 'caffè', explanation: '"Caffè" wymaga akcentu grave (è)', type: 'spelling' },
    { id: 'accent_pero', pattern: /\bpero\b/g, replacement: 'però', explanation: '"Però" (jednak/ale) wymaga akcentu grave (ò)', type: 'spelling' },
    { id: 'accent_cosi', pattern: /\bcosi\b/g, replacement: 'così', explanation: '"Così" (tak/w ten sposób) wymaga akcentu grave (ì)', type: 'spelling' },
    { id: 'art_in_il', pattern: /\bin\s+il\b/gi, replacement: 'nel', explanation: 'Przyimek "in" + rodzajnik "il" łączą się w "nel"', type: 'grammar' },
    { id: 'art_di_il', pattern: /\bdi\s+il\b/gi, replacement: 'del', explanation: 'Przyimek "di" + rodzajnik "il" łączą się w "del"', type: 'grammar' },
    { id: 'art_a_il', pattern: /\ba\s+il\b/gi, replacement: 'al', explanation: 'Przyimek "a" + rodzajnik "il" łączą się w "al"', type: 'grammar' },
    { id: 'art_da_il', pattern: /\bda\s+il\b/gi, replacement: 'dal', explanation: 'Przyimek "da" + rodzajnik "il" łączą się w "dal"', type: 'grammar' },
    { id: 'art_su_il', pattern: /\bsu\s+il\b/gi, replacement: 'sul', explanation: 'Przyimek "su" + rodzajnik "il" łączą się w "sul"', type: 'grammar' },
    { id: 'art_in_la', pattern: /\bin\s+la\b/gi, replacement: 'nella', explanation: 'Przyimek "in" + "la" = "nella"', type: 'grammar' },
    { id: 'art_di_la', pattern: /\bdi\s+la\b/gi, replacement: 'della', explanation: 'Przyimek "di" + "la" = "della"', type: 'grammar' },
    { id: 'elision_un_altra', pattern: /\bun\s+altra\b/gi, replacement: "un'altra", explanation: '"Un" przed rzeczownikiem żeńskim zaczynającym się od samogłoski wymaga apostrofu: un\'altra', type: 'grammar' },
    { id: 'elision_la_acqua', pattern: /\bla\s+acqua\b/gi, replacement: "l'acqua", explanation: 'Rodzajnik "la" przed samogłoską ulega elizji: l\'acqua', type: 'grammar' },
    { id: 'elision_lo_uomo', pattern: /\blo\s+uomo\b/gi, replacement: "l'uomo", explanation: 'Rodzajnik "lo" przed samogłoską ulega elizji: l\'uomo', type: 'grammar' },
    { id: 'neg_non_niente', pattern: /\bnon\s+niente\b/gi, replacement: 'non... niente', explanation: '"Non...niente" — podwójna negacja jest poprawna po włosku (inaczej niż w polskim)', type: 'grammar' },
    { id: 'verb_fare_to', pattern: /\bfare\s+to\b/gi, replacement: 'farlo', explanation: 'Po bezokoliczniku "fare" zaimek bezpośredni się klitykuje: farlo, farla, farli', type: 'grammar' },
  ];

  for (const { id, pattern, replacement, explanation, type } of errorPatterns) {
    const match = corrected.match(pattern);
    if (match) {
      corrections.push({ original: match[0], corrected: replacement, explanation, type, patternId: id });
      corrected = corrected.replace(pattern, replacement);
    }
  }

  // Check for capitalization after period
  corrected = corrected.replace(/\.\s+([a-zàèéìòù])/g, (_, letter) => {
    corrections.push({
      original: _,
      corrected: `. ${letter.toUpperCase()}`,
      explanation: 'Po kropce następne zdanie zaczyna się wielką literą',
      type: 'grammar',
      patternId: 'cap_after_period',
    });
    return `. ${letter.toUpperCase()}`;
  });

  // Suggestions based on level
  if (level === 'A1' || level === 'A2') {
    if (text.length > 20 && !text.includes(',')) {
      suggestions.push('Spróbuj użyć przecinków, żeby podzielić dłuższe zdania');
    }
    if (!text.match(/[.!?]$/)) {
      suggestions.push('Pamiętaj o znaku interpunkcyjnym na końcu zdania');
    }
  }
  if (level === 'B1' || level === 'B2') {
    if (!text.match(/\b(perché|quindi|tuttavia|inoltre|comunque|poiché|affinché)\b/i)) {
      suggestions.push('Spróbuj użyć łączników: perché, quindi, tuttavia, inoltre, poiché');
    }
    if (!text.match(/\b(condizionale|potrei|dovrei|vorrei)\b/i)) {
      suggestions.push('Ćwicz tryb warunkowy: potrei (mógłbym), dovrei (powinienem), vorrei (chciałbym)');
    }
  }
  if (level === 'C1' || level === 'C2') {
    if (text.split(' ').length < 50) {
      suggestions.push('Na poziomie C1+ staraj się pisać co najmniej 80-100 słów dla pełnego wyrazu myśli');
    }
    if (!text.match(/\b(sebbene|benché|nonostante|affinché|purché)\b/i)) {
      suggestions.push('Użyj trybu łączącego (congiuntivo): sebbene, benché, nonostante + congiuntivo');
    }
  }

  const score = Math.max(0, 100 - corrections.length * 10);
  return { corrected, corrections, score, suggestions };
}

// Targeted exercises based on common errors
const TARGETED_EXERCISES: Record<string, { prompt: string; promptPl: string }> = {
  pp_andare_avere: { prompt: 'Scrivi 3 frasi usando il passato prossimo con i verbi: andare, venire, uscire, tornare.', promptPl: 'Napisz 3 zdania używając passato prossimo z czasownikami: andare, venire, uscire, tornare.' },
  pp_venire_avere: { prompt: 'Scrivi 3 frasi usando il passato prossimo con i verbi: venire, partire, arrivare.', promptPl: 'Napisz 3 zdania używając passato prossimo z czasownikami: venire, partire, arrivare.' },
  accent_piu: { prompt: 'Scrivi 5 frasi usando: più, perché, così, però, città — con gli accenti corretti.', promptPl: 'Napisz 5 zdań używając: più, perché, così, però, città — z poprawnymi akcentami.' },
  art_in_il: { prompt: 'Scrivi frasi usando le preposizioni articolate: nel, del, al, dal, sul.', promptPl: 'Napisz zdania używając przyimków złożonych: nel, del, al, dal, sul.' },
  elision_la_acqua: { prompt: 'Esercizio sull\'elisione: scrivi frasi con l\'acqua, l\'uomo, l\'altra persona, l\'estate.', promptPl: 'Ćwiczenie elizji: napisz zdania z l\'acqua, l\'uomo, l\'altra persona, l\'estate.' },
};

// Writing prompts by level
const PROMPTS: Array<{ level: CEFRLevel; prompt: string; promptPl: string; category: string }> = [
  { level: 'A1', prompt: 'Descrivi la tua famiglia.', promptPl: 'Opisz swoją rodzinę.', category: 'Opis' },
  { level: 'A1', prompt: 'Cosa fai nel tempo libero?', promptPl: 'Co robisz w wolnym czasie?', category: 'Opis' },
  { level: 'A1', prompt: 'Descrivi la tua casa.', promptPl: 'Opisz swój dom.', category: 'Opis' },
  { level: 'A1', prompt: 'Cosa mangi di solito?', promptPl: 'Co zwykle jesz?', category: 'Opis' },
  { level: 'A2', prompt: 'Racconta cosa hai fatto ieri.', promptPl: 'Opowiedz co robiłeś wczoraj.', category: 'Narracja' },
  { level: 'A2', prompt: 'Descrivi il tuo ultimo viaggio.', promptPl: 'Opisz swoją ostatnią podróż.', category: 'Narracja' },
  { level: 'A2', prompt: 'Scrivi una email per prenotare un hotel.', promptPl: 'Napisz email z rezerwacją hotelu.', category: 'Formalny' },
  { level: 'B1', prompt: 'Quali sono i vantaggi e gli svantaggi dei social media?', promptPl: 'Jakie są zalety i wady mediów społecznościowych?', category: 'Opinia' },
  { level: 'B1', prompt: 'Se potessi vivere in qualsiasi paese, quale sceglieresti e perché?', promptPl: 'Gdybyś mógł mieszkać w dowolnym kraju, który byś wybrał i dlaczego?', category: 'Argumentacja' },
  { level: 'B1', prompt: 'Descrivi un evento importante della tua vita.', promptPl: 'Opisz ważne wydarzenie z twojego życia.', category: 'Narracja' },
  { level: 'B2', prompt: 'Scrivi un articolo sul cambiamento climatico e le possibili soluzioni.', promptPl: 'Napisz artykuł o zmianach klimatycznych i możliwych rozwiązaniach.', category: 'Esej' },
  { level: 'B2', prompt: 'Analizza il ruolo della tecnologia nell\'educazione moderna.', promptPl: 'Przeanalizuj rolę technologii we współczesnej edukacji.', category: 'Analiza' },
  { level: 'B2', prompt: 'Quali sono i cambiamenti più importanti della società italiana negli ultimi decenni?', promptPl: 'Jakie są najważniejsze zmiany w społeczeństwie włoskim w ostatnich dekadach?', category: 'Analiza' },
  { level: 'C1', prompt: 'Discuti il concetto di identità culturale in un mondo globalizzato.', promptPl: 'Omów pojęcie tożsamości kulturowej w zglobalizowanym świecie.', category: 'Esej akademicki' },
  { level: 'C1', prompt: 'Analizza il rapporto tra arte e politica nella storia italiana del Novecento.', promptPl: 'Przeanalizuj relację między sztuką a polityką w historii włoskiej XX wieku.', category: 'Analiza kulturowa' },
  { level: 'C2', prompt: 'Il concetto di "dolce vita" è ancora rilevante nell\'Italia contemporanea? Discuti.', promptPl: 'Czy pojęcie "dolce vita" jest nadal aktualne we współczesnych Włoszech? Omów.', category: 'Esej C2' },
];

export function WritingPractice({ userLevel, onXp }: {
  userLevel: CEFRLevel;
  onXp: (xp: number) => void;
}) {
  const [mode, setMode] = useState<'choose' | 'write' | 'result'>('choose');
  const [selectedPrompt, setSelectedPrompt] = useState<typeof PROMPTS[0] | null>(null);
  const [text, setText] = useState('');
  const [result, setResult] = useState<ReturnType<typeof analyzeItalianText> | null>(null);
  const [errorRecords, setErrorRecords] = useState<ErrorRecord[]>([]);

  useEffect(() => {
    setErrorRecords(loadErrorRecords());
  }, [mode]);

  const levelOrder: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const availablePrompts = PROMPTS.filter(p => levelOrder.indexOf(p.level) <= levelOrder.indexOf(userLevel));

  // Top 3 most frequent errors
  const topErrors = [...errorRecords].sort((a, b) => b.count - a.count).slice(0, 3);

  if (mode === 'choose') {
    return (
      <div className="animate-fade-in">
        <h2 className="text-xl font-bold text-text-bright mb-2">Pisanie</h2>
        <p className="text-text-dim text-sm mb-6">
          Pisz po włosku — system poprawia gramatykę, ortografię i styl. Śledzi też twoje najczęstsze błędy.
        </p>

        {/* Common error tracker */}
        {topErrors.length > 0 && (
          <div className="bg-danger/5 border border-danger/20 rounded-xl p-4 mb-6">
            <div className="text-sm font-semibold text-danger mb-3">Twoje najczęstsze błędy</div>
            <div className="space-y-2">
              {topErrors.map(err => (
                <div key={err.patternId} className="flex items-center justify-between">
                  <div>
                    <span className={`text-xs px-2 py-0.5 rounded mr-2 ${
                      err.type === 'grammar' ? 'bg-danger/20 text-danger' : 'bg-warning/20 text-warning'
                    }`}>
                      {err.type === 'grammar' ? 'Gramatyka' : 'Ortografia'}
                    </span>
                    <span className="text-sm text-text">{err.label}...</span>
                  </div>
                  <span className="text-xs text-text-dim">{err.count}×</span>
                </div>
              ))}
            </div>
            {topErrors.length > 0 && TARGETED_EXERCISES[topErrors[0].patternId] && (
              <button
                onClick={() => {
                  setSelectedPrompt({
                    level: userLevel,
                    ...TARGETED_EXERCISES[topErrors[0].patternId],
                    category: 'Ćwiczenie celowane',
                  });
                  setMode('write');
                }}
                className="mt-3 w-full py-2 bg-danger/10 border border-danger/30 rounded-lg text-danger text-sm hover:bg-danger/20 transition-colors"
              >
                🎯 Ćwicz swój najsłabszy punkt
              </button>
            )}
          </div>
        )}

        {/* Free write */}
        <button
          onClick={() => { setSelectedPrompt(null); setMode('write'); }}
          className="w-full text-left p-4 rounded-xl border border-accent/30 bg-accent/5 hover:bg-accent/10 transition-colors mb-6"
        >
          <div className="font-medium text-accent">✍️ Pisz dowolnie</div>
          <div className="text-sm text-text-dim mt-1">Napisz cokolwiek po włosku</div>
        </button>

        {/* Prompts */}
        <h3 className="text-sm font-semibold text-text-bright mb-3">Tematy do pisania</h3>
        <div className="space-y-2">
          {availablePrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => { setSelectedPrompt(prompt); setMode('write'); }}
              className="w-full text-left p-4 rounded-xl border border-border bg-bg-card hover:bg-bg-hover transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-text-bright">{prompt.prompt}</div>
                  <div className="text-sm text-text-dim mt-1">{prompt.promptPl}</div>
                </div>
                <div className="flex gap-2 shrink-0 ml-3">
                  <span className="px-2 py-0.5 bg-bg rounded text-xs text-text-dim">{prompt.category}</span>
                  <span className="px-2 py-0.5 bg-accent/20 rounded text-xs text-accent">{prompt.level}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (mode === 'write') {
    return (
      <div className="animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => { setMode('choose'); setText(''); }} className="text-text-dim hover:text-text text-sm">← Powrót</button>
        </div>

        {selectedPrompt && (
          <div className="bg-bg-card rounded-xl p-4 border border-border mb-4">
            <div className="text-text-bright">{selectedPrompt.prompt}</div>
            <div className="text-sm text-text-dim mt-1">{selectedPrompt.promptPl}</div>
          </div>
        )}

        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Scrivi in italiano..."
          className="w-full h-64 px-4 py-3 bg-bg-input border border-border rounded-xl text-text placeholder-text-dim resize-none focus:outline-none focus:border-accent"
          autoFocus
        />

        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-text-dim">{text.split(/\s+/).filter(Boolean).length} słów</span>
        </div>

        <button
          onClick={() => {
            const analysis = analyzeItalianText(text, userLevel);
            setResult(analysis);
            trackErrors(analysis.corrections);
            setMode('result');
            const xp = 25 + (analysis.score >= 80 ? 15 : 0);
            onXp(xp);
          }}
          disabled={text.trim().length < 10}
          className={`w-full mt-4 py-4 font-bold rounded-xl transition-colors ${
            text.trim().length >= 10 ? 'bg-accent text-bg hover:bg-accent-dim' : 'bg-bg-card text-text-dim border border-border cursor-not-allowed'
          }`}
        >
          Sprawdź tekst
        </button>
      </div>
    );
  }

  // Result
  if (!result) return null;

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => { setMode('choose'); setText(''); setResult(null); }} className="text-text-dim hover:text-text text-sm">← Nowy tekst</button>
      </div>

      {/* Score */}
      <div className="text-center mb-6">
        <div className={`text-4xl font-bold ${result.score >= 80 ? 'text-accent' : result.score >= 50 ? 'text-warning' : 'text-danger'}`}>
          {result.score}%
        </div>
        <div className="text-text-dim text-sm">poprawność tekstu</div>
        {result.score >= 80 && <div className="text-accent text-sm mt-1">+40 XP — doskonały wynik!</div>}
      </div>

      {/* Recurring error badge */}
      {result.corrections.some(c => (errorRecords.find(r => r.patternId === c.patternId)?.count || 0) > 1) && (
        <div className="bg-warning/10 border border-warning/30 rounded-xl p-3 mb-4 text-sm text-warning">
          ⚠️ Niektóre błędy to twoje powtarzające się słabe punkty — ćwicz je celowo!
        </div>
      )}

      {/* Corrected text */}
      <div className="bg-bg-card rounded-xl p-5 border border-border mb-4">
        <h3 className="text-sm font-semibold text-text-bright mb-3">Poprawiona wersja</h3>
        <div className="text-text-bright whitespace-pre-wrap leading-relaxed">{result.corrected}</div>
      </div>

      {/* Corrections */}
      {result.corrections.length > 0 && (
        <div className="bg-bg-card rounded-xl p-5 border border-border mb-4">
          <h3 className="text-sm font-semibold text-text-bright mb-3">Poprawki ({result.corrections.length})</h3>
          <div className="space-y-3">
            {result.corrections.map((c, i) => {
              const timesSeenBefore = (errorRecords.find(r => r.patternId === c.patternId)?.count || 0);
              return (
                <div key={i} className="bg-bg rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      c.type === 'grammar' ? 'bg-danger/20 text-danger' :
                      c.type === 'spelling' ? 'bg-warning/20 text-warning' :
                      c.type === 'word_choice' ? 'bg-info/20 text-info' :
                      'bg-xp/20 text-xp'
                    }`}>
                      {c.type === 'grammar' ? 'Gramatyka' : c.type === 'spelling' ? 'Ortografia' : c.type === 'word_choice' ? 'Dobór słów' : 'Styl'}
                    </span>
                    {timesSeenBefore > 1 && (
                      <span className="px-2 py-0.5 rounded text-xs bg-warning/20 text-warning">
                        Powtarza się ({timesSeenBefore}×)
                      </span>
                    )}
                  </div>
                  <div className="text-sm">
                    <span className="text-danger line-through">{c.original}</span>
                    <span className="text-text-dim mx-2">→</span>
                    <span className="text-accent font-medium">{c.corrected}</span>
                  </div>
                  <div className="text-xs text-text-dim mt-1">{c.explanation}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Suggestions */}
      {result.suggestions.length > 0 && (
        <div className="bg-bg-card rounded-xl p-5 border border-border mb-4">
          <h3 className="text-sm font-semibold text-text-bright mb-3">Sugestie</h3>
          <ul className="space-y-2">
            {result.suggestions.map((s, i) => (
              <li key={i} className="text-sm text-text-dim flex gap-2">
                <span className="text-accent">💡</span> {s}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={() => { setMode('write'); setResult(null); }}
        className="w-full py-3 bg-bg-card border border-border rounded-xl text-text hover:bg-bg-hover font-medium"
      >
        Popraw i wyślij ponownie
      </button>
    </div>
  );
}
