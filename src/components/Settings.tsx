import type { UserProgress } from '../types';
import { resetAllData, exportData } from '../engine/storage';

export function Settings({ progress, onUpdate }: {
  progress: UserProgress;
  onUpdate: (p: UserProgress) => void;
}) {
  const s = progress.settings;

  const updateSettings = (partial: Partial<typeof s>) => {
    onUpdate({
      ...progress,
      settings: { ...s, ...partial },
    });
  };

  return (
    <div className="animate-fade-in space-y-6">
      <h2 className="text-xl font-bold text-text-bright">Ustawienia</h2>

      {/* Session settings */}
      <div className="bg-bg-card rounded-xl p-5 border border-border">
        <h3 className="text-sm font-semibold text-text-bright mb-4">Sesja dzienna</h3>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-text-dim block mb-1">Cel dzienny (minuty)</label>
            <input
              type="range"
              min={5}
              max={60}
              step={5}
              value={s.dailyGoalMinutes}
              onChange={e => updateSettings({ dailyGoalMinutes: parseInt(e.target.value) })}
              className="w-full accent-accent"
            />
            <div className="text-sm text-text-bright mt-1">{s.dailyGoalMinutes} minut</div>
          </div>

          <div>
            <label className="text-sm text-text-dim block mb-3">Podział sesji</label>
            <div className="space-y-3">
              {[
                { key: 'srsReview' as const, label: 'Powtórka SRS' },
                { key: 'newContent' as const, label: 'Nowe treści' },
                { key: 'listening' as const, label: 'Słuchanie / Shadowing' },
                { key: 'scenario' as const, label: 'Scenariusze / Gramatyka' },
              ].map(item => (
                <div key={item.key} className="flex items-center gap-3">
                  <span className="text-sm text-text w-40">{item.label}</span>
                  <input
                    type="range"
                    min={0}
                    max={80}
                    step={5}
                    value={s.sessionSplit[item.key]}
                    onChange={e => updateSettings({
                      sessionSplit: { ...s.sessionSplit, [item.key]: parseInt(e.target.value) },
                    })}
                    className="flex-1 accent-accent"
                  />
                  <span className="text-sm text-text-bright w-12 text-right">{s.sessionSplit[item.key]}%</span>
                </div>
              ))}
            </div>
            {(() => {
              const total = Object.values(s.sessionSplit).reduce((a, b) => a + b, 0);
              return total !== 100 && (
                <div className="text-xs text-warning mt-2">Suma: {total}% (powinno być 100%)</div>
              );
            })()}
          </div>
        </div>
      </div>

      {/* Audio settings */}
      <div className="bg-bg-card rounded-xl p-5 border border-border">
        <h3 className="text-sm font-semibold text-text-bright mb-4">Audio</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-text-dim block mb-1">Prędkość TTS</label>
            <input
              type="range"
              min={0.5}
              max={1.5}
              step={0.05}
              value={s.ttsSpeed}
              onChange={e => updateSettings({ ttsSpeed: parseFloat(e.target.value) })}
              className="w-full accent-accent"
            />
            <div className="text-sm text-text-bright mt-1">{s.ttsSpeed.toFixed(2)}x</div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={s.autoPlayAudio}
              onChange={e => updateSettings({ autoPlayAudio: e.target.checked })}
              className="w-4 h-4 accent-accent"
            />
            <span className="text-sm text-text">Automatyczne odtwarzanie audio</span>
          </label>
        </div>
      </div>

      {/* Interface */}
      <div className="bg-bg-card rounded-xl p-5 border border-border">
        <h3 className="text-sm font-semibold text-text-bright mb-4">Interfejs</h3>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={s.immersionMode}
            onChange={e => updateSettings({ immersionMode: e.target.checked })}
            className="w-4 h-4 accent-accent"
          />
          <div>
            <span className="text-sm text-text">Tryb immersyjny (od B1)</span>
            <div className="text-xs text-text-dim">Interfejs w całości po włosku</div>
          </div>
        </label>
      </div>

      {/* Current level */}
      <div className="bg-bg-card rounded-xl p-5 border border-border">
        <h3 className="text-sm font-semibold text-text-bright mb-4">Poziom</h3>
        <div className="flex items-center gap-3">
          <span className="text-sm text-text-dim">Aktualny poziom:</span>
          <select
            value={progress.level}
            onChange={e => onUpdate({ ...progress, level: e.target.value as any })}
            className="px-3 py-2 bg-bg-input border border-border rounded-lg text-text focus:outline-none focus:border-accent"
          >
            <option value="A1">A1 — Początkujący</option>
            <option value="A2">A2 — Podstawowy</option>
            <option value="B1">B1 — Średnio zaawansowany</option>
            <option value="B2">B2 — Powyżej średniego</option>
            <option value="C1">C1 — Zaawansowany</option>
            <option value="C2">C2 — Biegły</option>
          </select>
        </div>
      </div>

      {/* Data management */}
      <div className="bg-bg-card rounded-xl p-5 border border-border">
        <h3 className="text-sm font-semibold text-text-bright mb-4">Dane</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => {
              const data = exportData();
              const blob = new Blob([data], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `italiano_backup_${new Date().toISOString().split('T')[0]}.json`;
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="px-4 py-2 bg-bg border border-border rounded-lg text-sm text-text hover:bg-bg-hover"
          >
            📦 Eksportuj dane
          </button>
          <button
            onClick={() => {
              if (confirm('Na pewno chcesz zresetować wszystkie dane? Tej operacji nie da się cofnąć.')) {
                resetAllData();
                window.location.reload();
              }
            }}
            className="px-4 py-2 bg-danger/10 border border-danger/30 rounded-lg text-sm text-danger hover:bg-danger/20"
          >
            🗑️ Resetuj dane
          </button>
        </div>
      </div>
    </div>
  );
}
