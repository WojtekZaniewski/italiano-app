const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', labelPl: 'Panel', icon: '📊' },
  { id: 'session', label: 'Sessione', labelPl: 'Sesja dzienna', icon: '🎯' },
  { id: 'flashcards', label: 'Ripasso', labelPl: 'Fiszki SRS', icon: '🃏' },
  { id: 'grammar', label: 'Grammatica', labelPl: 'Gramatyka', icon: '📐' },
  { id: 'scenarios', label: 'Scenari', labelPl: 'Scenariusze', icon: '🎭' },
  { id: 'reading', label: 'Lettura', labelPl: 'Czytanie', icon: '📖' },
  { id: 'listening', label: 'Ascolto', labelPl: 'Słuchanie', icon: '🔊' },
  { id: 'shadowing', label: 'Shadowing', labelPl: 'Shadowing', icon: '🎧' },
  { id: 'writing', label: 'Scrittura', labelPl: 'Pisanie', icon: '✍️' },
  { id: 'goldlist', label: 'Goldlist', labelPl: 'Goldlist', icon: '📋' },
  { id: 'maturita', label: 'Maturità', labelPl: 'Matura włoska', icon: '🎓' },
  { id: 'placement', label: 'Test', labelPl: 'Test poziomujący', icon: '📝' },
  { id: 'settings', label: 'Impostazioni', labelPl: 'Ustawienia', icon: '⚙️' },
];

export function Navigation({ currentPage, onNavigate }: {
  currentPage: string;
  onNavigate: (page: string) => void;
}) {
  return (
    <nav className="flex-1 py-2 overflow-y-auto">
      {NAV_ITEMS.map(item => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={`w-full flex items-center gap-3 px-5 py-3 text-left text-sm transition-colors ${
            currentPage === item.id
              ? 'bg-accent/10 text-accent border-r-2 border-accent'
              : 'text-text-dim hover:text-text hover:bg-bg-hover'
          }`}
        >
          <span className="text-base">{item.icon}</span>
          <div>
            <div className="font-medium">{item.label}</div>
            <div className="text-xs opacity-60">{item.labelPl}</div>
          </div>
        </button>
      ))}
    </nav>
  );
}
