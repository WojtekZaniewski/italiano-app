import { useState, useEffect } from 'react';
import type { GoldlistEntry } from '../types';
import { loadGoldlist, saveGoldlist } from '../engine/storage';

export function GoldlistModule({ onXp }: { onXp: (xp: number) => void }) {
  const [entries, setEntries] = useState<GoldlistEntry[]>([]);
  const [mode, setMode] = useState<'overview' | 'create' | 'review'>('overview');
  const [newPhrases, setNewPhrases] = useState<Array<{ phrase: string; translation: string }>>([]);

  useEffect(() => {
    setEntries(loadGoldlist());
  }, []);

  const save = (updated: GoldlistEntry[]) => {
    setEntries(updated);
    saveGoldlist(updated);
    window.dispatchEvent(new Event('italiano_data_changed'));
  };

  const today = new Date().toISOString().split('T')[0];
  const dueForReview = entries.filter(e => !e.remembered && e.nextReviewDate <= today);
  const totalRemembered = entries.filter(e => e.remembered).length;

  // Overview
  if (mode === 'overview') {
    return (
      <div className="animate-fade-in">
        <h2 className="text-xl font-bold text-text-bright mb-2">Goldlist</h2>
        <p className="text-text-dim text-sm mb-6">
          Metoda Goldlist — zapisujesz 20 fraz, po 14 dniach powtarzasz. Zapamiętane odpadają, zapomniane wracają.
          Bez stresu, bez cramming — czyste kodowanie w pamięci długotrwałej.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-bg-card rounded-xl p-4 border border-border text-center">
            <div className="text-2xl font-bold text-text-bright">{entries.length}</div>
            <div className="text-xs text-text-dim">Łącznie fraz</div>
          </div>
          <div className="bg-bg-card rounded-xl p-4 border border-border text-center">
            <div className="text-2xl font-bold text-accent">{totalRemembered}</div>
            <div className="text-xs text-text-dim">Zapamiętane</div>
          </div>
          <div className="bg-bg-card rounded-xl p-4 border border-border text-center">
            <div className={`text-2xl font-bold ${dueForReview.length > 0 ? 'text-warning' : 'text-text-bright'}`}>
              {dueForReview.length}
            </div>
            <div className="text-xs text-text-dim">Do powtórki</div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => {
              setNewPhrases(Array.from({ length: 20 }, () => ({ phrase: '', translation: '' })));
              setMode('create');
            }}
            className="p-4 bg-accent/10 border border-accent/30 rounded-xl text-left hover:bg-accent/20 transition-colors"
          >
            <div className="text-lg font-semibold text-accent">📝 Nowa lista</div>
            <div className="text-sm text-text-dim mt-1">Zapisz 20 nowych fraz z pamięci</div>
          </button>

          {dueForReview.length > 0 && (
            <button
              onClick={() => setMode('review')}
              className="p-4 bg-warning/10 border border-warning/30 rounded-xl text-left hover:bg-warning/20 transition-colors"
            >
              <div className="text-lg font-semibold text-warning">🔄 Powtórka</div>
              <div className="text-sm text-text-dim mt-1">{dueForReview.length} fraz czeka na przegląd</div>
            </button>
          )}
        </div>

        {/* Recent entries */}
        {entries.length > 0 && (
          <div className="bg-bg-card rounded-xl p-5 border border-border">
            <h3 className="text-sm font-semibold text-text-bright mb-3">Ostatnie frazy</h3>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {entries.slice(-20).reverse().map(e => (
                <div key={e.id} className={`flex items-center justify-between p-2 rounded-lg ${e.remembered ? 'bg-accent/5' : 'bg-bg'}`}>
                  <div>
                    <span className="text-text-bright text-sm">{e.phrase}</span>
                    <span className="text-text-dim text-sm ml-2">— {e.translation}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-text-dim">Cykl {e.cycle}</span>
                    {e.remembered && <span className="text-accent text-xs">✓</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Create new goldlist
  if (mode === 'create') {
    const filledCount = newPhrases.filter(p => p.phrase.trim() && p.translation.trim()).length;

    return (
      <div className="animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => setMode('overview')} className="text-text-dim hover:text-text text-sm">← Powrót</button>
          <span className="text-sm text-text-dim">{filledCount}/20 fraz</span>
        </div>

        <div className="bg-bg-card rounded-xl p-5 border border-border mb-4">
          <h3 className="text-sm font-semibold text-text-bright mb-1">Nowa lista Goldlist</h3>
          <p className="text-xs text-text-dim mb-4">
            Zapisz 20 włoskich fraz Z PAMIĘCI. Nie sprawdzaj — pisz to, co pamiętasz. To klucz metody.
          </p>

          <div className="space-y-2">
            {newPhrases.map((p, i) => (
              <div key={i} className="flex gap-2">
                <span className="text-xs text-text-dim w-6 py-2 text-right shrink-0">{i + 1}</span>
                <input
                  type="text"
                  value={p.phrase}
                  onChange={e => {
                    const updated = [...newPhrases];
                    updated[i] = { ...updated[i], phrase: e.target.value };
                    setNewPhrases(updated);
                  }}
                  placeholder="Fraza po włosku"
                  className="flex-1 px-3 py-2 bg-bg-input border border-border rounded-lg text-sm text-text placeholder-text-dim focus:outline-none focus:border-accent"
                />
                <input
                  type="text"
                  value={p.translation}
                  onChange={e => {
                    const updated = [...newPhrases];
                    updated[i] = { ...updated[i], translation: e.target.value };
                    setNewPhrases(updated);
                  }}
                  placeholder="Po polsku"
                  className="flex-1 px-3 py-2 bg-bg-input border border-border rounded-lg text-sm text-text placeholder-text-dim focus:outline-none focus:border-accent"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => {
            const filled = newPhrases.filter(p => p.phrase.trim() && p.translation.trim());
            if (filled.length === 0) return;

            const reviewDate = new Date();
            reviewDate.setDate(reviewDate.getDate() + 14);
            const reviewDateStr = reviewDate.toISOString().split('T')[0];

            const newEntries: GoldlistEntry[] = filled.map((p, i) => ({
              id: `gl_${Date.now()}_${i}`,
              phrase: p.phrase.trim(),
              translation: p.translation.trim(),
              dateAdded: today,
              nextReviewDate: reviewDateStr,
              cycle: 1,
              remembered: false,
            }));

            save([...entries, ...newEntries]);
            onXp(10 * filled.length);
            setMode('overview');
          }}
          disabled={filledCount === 0}
          className={`w-full py-4 font-bold rounded-xl transition-colors ${
            filledCount > 0 ? 'bg-accent text-bg hover:bg-accent-dim' : 'bg-bg-card text-text-dim border border-border cursor-not-allowed'
          }`}
        >
          Zapisz {filledCount} fraz (powtórka za 14 dni)
        </button>
      </div>
    );
  }

  // Review mode
  if (mode === 'review') {
    return (
      <div className="animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => setMode('overview')} className="text-text-dim hover:text-text text-sm">← Powrót</button>
          <span className="text-sm text-text-dim">{dueForReview.length} do przeglądu</span>
        </div>

        <div className="bg-bg-card rounded-xl p-5 border border-border">
          <h3 className="text-sm font-semibold text-text-bright mb-1">Przegląd Goldlist</h3>
          <p className="text-xs text-text-dim mb-4">
            Zaznacz frazy, które pamiętasz. Zapomniane wrócą do powtórki za kolejne 14 dni.
          </p>

          <div className="space-y-2">
            {dueForReview.map(entry => (
              <div key={entry.id} className="flex items-center gap-3 p-3 bg-bg rounded-lg">
                <div className="flex-1">
                  <div className="text-text-bright">{entry.phrase}</div>
                  <div className="text-sm text-text-dim">{entry.translation}</div>
                  <div className="text-xs text-text-dim mt-1">Cykl {entry.cycle} • Dodano {entry.dateAdded}</div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => {
                      const updated = entries.map(e =>
                        e.id === entry.id ? { ...e, remembered: true } : e
                      );
                      save(updated);
                      onXp(10);
                    }}
                    className="px-3 py-2 bg-accent/20 text-accent rounded-lg text-sm hover:bg-accent/30"
                  >
                    ✓ Pamiętam
                  </button>
                  <button
                    onClick={() => {
                      const reviewDate = new Date();
                      reviewDate.setDate(reviewDate.getDate() + 14);
                      const updated = entries.map(e =>
                        e.id === entry.id ? { ...e, cycle: e.cycle + 1, nextReviewDate: reviewDate.toISOString().split('T')[0] } : e
                      );
                      save(updated);
                    }}
                    className="px-3 py-2 bg-danger/20 text-danger rounded-lg text-sm hover:bg-danger/30"
                  >
                    ✗ Zapomniałem
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {dueForReview.length === 0 && (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">✅</div>
            <p className="text-text-bright font-semibold">Wszystko przejrzane!</p>
            <button
              onClick={() => setMode('overview')}
              className="mt-4 px-6 py-2 bg-accent text-bg rounded-lg font-medium"
            >
              Powrót
            </button>
          </div>
        )}
      </div>
    );
  }

  return null;
}
