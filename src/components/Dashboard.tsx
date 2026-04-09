import type { UserProgress, SRSCard } from '../types';
import { getLevel, getWeeklyChallenges } from '../engine/scoring';
import { getCardStats } from '../engine/srs';

export function Dashboard({ progress, cards, onNavigate }: {
  progress: UserProgress;
  cards: SRSCard[];
  onNavigate: (page: string) => void;
}) {
  const level = getLevel(progress.totalXp);
  const stats = getCardStats(cards);
  const challenges = getWeeklyChallenges(progress, cards);

  const today = new Date().toISOString().split('T')[0];
  const todayXp = progress.dailyXpHistory[today] || 0;

  // Build 7-day data (newest last for chart)
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(Date.now() - (6 - i) * 86400000);
    const key = date.toISOString().split('T')[0];
    const dayNames = ['N', 'P', 'W', 'Ś', 'C', 'P', 'S'];
    return {
      label: dayNames[date.getDay()],
      xp: progress.dailyXpHistory[key] || 0,
      isToday: key === today,
    };
  });
  const weekXp = weekDays.reduce((a, d) => a + d.xp, 0);
  const maxDayXp = Math.max(...weekDays.map(d => d.xp), 1);

  // Build 30-day activity data (5 rows × 6 cols = 30 days, newest = top-right)
  const thirtyDays = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(Date.now() - (29 - i) * 86400000);
    const key = date.toISOString().split('T')[0];
    const xp = progress.dailyXpHistory[key] || 0;
    return { xp, isToday: key === today };
  });

  return (
    <div className="animate-fade-in space-y-6">
      {/* Top stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Passa" value={`${progress.streak} dni`} accent={progress.streak >= 7} icon="🔥" />
        <StatCard label="Dzisiaj" value={`${todayXp} XP`} icon="⚡" />
        <StatCard label="Słowa" value={`${progress.wordsLearned}`} icon="📚" />
        <StatCard label="Do powtórki" value={`${stats.due}`} accent={stats.due > 0} icon="🃏" />
      </div>

      {/* Level progress */}
      <div className="bg-bg-card rounded-xl p-5 border border-border">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-xs text-text-dim uppercase tracking-wide">Poziom</div>
            <div className="text-xl font-bold text-text-bright">{level.name}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-text-dim">CEFR</div>
            <div className="text-xl font-bold text-accent">{progress.level}</div>
          </div>
        </div>
        <div className="w-full bg-bg rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-accent-dim to-accent rounded-full transition-all duration-500"
            style={{ width: `${level.progress * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-1 text-xs text-text-dim">
          <span>{progress.totalXp} XP</span>
          <span>{level.nextThreshold} XP</span>
        </div>
      </div>

      {/* Weekly XP Chart */}
      <div className="bg-bg-card rounded-xl p-5 border border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-text-bright">XP — ostatnie 7 dni</h3>
          <span className="text-sm text-xp font-semibold">{weekXp} XP</span>
        </div>
        <WeeklyXpChart days={weekDays} maxXp={maxDayXp} />
      </div>

      {/* 30-day activity heatmap */}
      <div className="bg-bg-card rounded-xl p-5 border border-border">
        <h3 className="text-sm font-semibold text-text-bright mb-4">Aktywność — 30 dni</h3>
        <ActivityHeatmap days={thirtyDays} />
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <button
          onClick={() => onNavigate('session')}
          className="bg-accent/10 border border-accent/30 rounded-xl p-5 text-left hover:bg-accent/20 transition-colors group"
        >
          <div className="text-2xl mb-2">🎯</div>
          <div className="text-lg font-semibold text-accent group-hover:text-accent">Rozpocznij sesję</div>
          <div className="text-sm text-text-dim mt-1">
            {stats.due > 0 ? `${stats.due} kart do powtórki` : 'Nowe materiały czekają'}
          </div>
        </button>

        {!progress.placementTestTaken && (
          <button
            onClick={() => onNavigate('placement')}
            className="bg-info/10 border border-info/30 rounded-xl p-5 text-left hover:bg-info/20 transition-colors group"
          >
            <div className="text-2xl mb-2">📝</div>
            <div className="text-lg font-semibold text-info">Test poziomujący</div>
            <div className="text-sm text-text-dim mt-1">Sprawdź swój aktualny poziom</div>
          </button>
        )}

        {progress.placementTestTaken && (
          <button
            onClick={() => onNavigate('flashcards')}
            className="bg-xp/10 border border-xp/30 rounded-xl p-5 text-left hover:bg-xp/20 transition-colors group"
          >
            <div className="text-2xl mb-2">🃏</div>
            <div className="text-lg font-semibold text-xp">Powtórka SRS</div>
            <div className="text-sm text-text-dim mt-1">{stats.due} kart oczekuje</div>
          </button>
        )}
      </div>

      {/* SRS Box Distribution */}
      <div className="bg-bg-card rounded-xl p-5 border border-border">
        <h3 className="text-sm font-semibold text-text-bright mb-4">Rozkład fiszek (Leitner)</h3>
        <LeitnerChart boxCounts={stats.boxCounts} />
        <div className="flex justify-between mt-3 text-xs text-text-dim">
          <span>Nowe</span>
          <span>Opanowane</span>
        </div>
      </div>

      {/* Weekly challenges */}
      <div className="bg-bg-card rounded-xl p-5 border border-border">
        <h3 className="text-sm font-semibold text-text-bright mb-4">Wyzwania tygodniowe</h3>
        <div className="space-y-3">
          {challenges.map(ch => {
            const pct = Math.min(100, (ch.current / ch.target) * 100);
            return (
              <div key={ch.id}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-text">{ch.title}</span>
                  <span className="text-text-dim">{ch.current}/{ch.target} {ch.unit}</span>
                </div>
                <div className="w-full bg-bg rounded-full h-2 overflow-hidden">
                  <div className="h-full bg-gold rounded-full transition-all" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievements */}
      {progress.achievements.length > 0 && (
        <div className="bg-bg-card rounded-xl p-5 border border-border">
          <h3 className="text-sm font-semibold text-text-bright mb-4">Osiągnięcia</h3>
          <div className="flex flex-wrap gap-3">
            {progress.achievements.map(a => (
              <div
                key={a.id}
                className="bg-bg rounded-lg p-3 border border-border text-center min-w-[80px]"
                title={a.description}
              >
                <div className="text-2xl">{a.icon}</div>
                <div className="text-xs text-text-dim mt-1">{a.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <MiniStat label="Sesje ukończone" value={progress.sessionsCompleted} />
        <MiniStat label="Łączny czas" value={`${Math.round(progress.totalMinutes / 60)}h ${progress.totalMinutes % 60}m`} />
        <MiniStat label="Ten tydzień" value={`${weekXp} XP`} />
        <MiniStat label="Najdłuższa passa" value={`${progress.longestStreak} dni`} />
        <MiniStat label="Trafność SRS" value={`${Math.round(stats.avgAccuracy * 100)}%`} />
        <MiniStat label="Opanowane" value={stats.mastered} />
      </div>
    </div>
  );
}

// ── SVG Charts ─────────────────────────────────────────────────────────────

function WeeklyXpChart({ days, maxXp }: { days: { label: string; xp: number; isToday: boolean }[]; maxXp: number }) {
  const W = 280;
  const H = 80;
  const pad = 4;
  const barW = (W - pad * 8) / 7;

  return (
    <svg viewBox={`0 0 ${W} ${H + 20}`} className="w-full" aria-label="Weekly XP chart">
      {days.map((d, i) => {
        const barH = maxXp > 0 ? Math.max((d.xp / maxXp) * H, d.xp > 0 ? 4 : 0) : 0;
        const x = i * (barW + pad) + pad / 2;
        const y = H - barH;
        return (
          <g key={i}>
            {/* Background track */}
            <rect x={x} y={0} width={barW} height={H} rx={3} fill="rgba(255,255,255,0.04)" />
            {/* XP bar */}
            {d.xp > 0 && (
              <rect
                x={x} y={y} width={barW} height={barH} rx={3}
                fill={d.isToday ? '#00d4aa' : '#00d4aa66'}
              />
            )}
            {/* XP label on top */}
            {d.xp > 0 && (
              <text x={x + barW / 2} y={y - 3} textAnchor="middle" fontSize={8} fill={d.isToday ? '#00d4aa' : '#ffffff66'}>
                {d.xp}
              </text>
            )}
            {/* Day label */}
            <text
              x={x + barW / 2} y={H + 14} textAnchor="middle" fontSize={9}
              fill={d.isToday ? '#00d4aa' : '#ffffff44'}
              fontWeight={d.isToday ? '700' : '400'}
            >
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function ActivityHeatmap({ days }: { days: { xp: number; isToday: boolean }[] }) {
  const cols = 6;
  const rows = 5;
  const size = 28;
  const gap = 4;
  const W = cols * (size + gap) - gap;
  const H = rows * (size + gap) - gap;

  const maxXp = Math.max(...days.map(d => d.xp), 1);

  const getColor = (xp: number, isToday: boolean) => {
    if (isToday && xp === 0) return 'rgba(0,212,170,0.15)';
    if (xp === 0) return 'rgba(255,255,255,0.04)';
    const intensity = Math.min(xp / maxXp, 1);
    // Green gradient: light → full
    const alpha = 0.2 + intensity * 0.8;
    return `rgba(0,212,170,${alpha.toFixed(2)})`;
  };

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-xs mx-auto" aria-label="30-day activity">
      {days.map((d, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = col * (size + gap);
        const y = row * (size + gap);
        return (
          <g key={i}>
            <rect x={x} y={y} width={size} height={size} rx={4} fill={getColor(d.xp, d.isToday)} />
            {d.isToday && (
              <rect x={x} y={y} width={size} height={size} rx={4} fill="none" stroke="#00d4aa" strokeWidth={1.5} />
            )}
            {d.xp > 0 && (
              <text x={x + size / 2} y={y + size / 2 + 4} textAnchor="middle" fontSize={8} fill="rgba(255,255,255,0.7)">
                {d.xp > 999 ? `${Math.round(d.xp / 100) / 10}k` : d.xp}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

function LeitnerChart({ boxCounts }: { boxCounts: number[] }) {
  const BOX_COLORS = ['#ef4444', '#f59e0b', '#eab308', '#22c55e', '#3b82f6'];
  const maxCount = Math.max(...boxCounts, 1);
  const H = 80;

  return (
    <svg viewBox={`0 0 280 ${H + 20}`} className="w-full" aria-label="Leitner box distribution">
      {boxCounts.map((count, i) => {
        const barW = 40;
        const gap = 12;
        const totalW = boxCounts.length * (barW + gap) - gap;
        const startX = (280 - totalW) / 2;
        const barH = Math.max((count / maxCount) * H, count > 0 ? 4 : 0);
        const x = startX + i * (barW + gap);
        const y = H - barH;
        return (
          <g key={i}>
            <rect x={x} y={0} width={barW} height={H} rx={4} fill="rgba(255,255,255,0.04)" />
            {count > 0 && <rect x={x} y={y} width={barW} height={barH} rx={4} fill={BOX_COLORS[i]} opacity={0.8} />}
            <text x={x + barW / 2} y={count > 0 ? y - 3 : H - 2} textAnchor="middle" fontSize={9} fill={BOX_COLORS[i]}>
              {count}
            </text>
            <text x={x + barW / 2} y={H + 14} textAnchor="middle" fontSize={9} fill="rgba(255,255,255,0.4)">
              B{i + 1}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function StatCard({ label, value, icon, accent }: { label: string; value: string | number; icon: string; accent?: boolean }) {
  return (
    <div className={`bg-bg-card rounded-xl p-4 border ${accent ? 'border-accent/40' : 'border-border'}`}>
      <div className="flex items-center gap-2 mb-1">
        <span>{icon}</span>
        <span className="text-xs text-text-dim uppercase tracking-wide">{label}</span>
      </div>
      <div className={`text-xl font-bold ${accent ? 'text-accent' : 'text-text-bright'}`}>{value}</div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-bg-card rounded-lg p-3 border border-border">
      <div className="text-xs text-text-dim">{label}</div>
      <div className="text-lg font-semibold text-text-bright mt-1">{value}</div>
    </div>
  );
}
