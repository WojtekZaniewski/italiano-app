import { useState } from 'react';
import type { ReactNode } from 'react';
import { Navigation } from './Navigation';

const BOTTOM_TABS = [
  { id: 'dashboard',  icon: '📊', labelPl: 'Panel',      labelIt: 'Pannello' },
  { id: 'session',    icon: '🎯', labelPl: 'Sesja',      labelIt: 'Sessione' },
  { id: 'flashcards', icon: '🃏', labelPl: 'Fiszki',     labelIt: 'Ripasso' },
  { id: 'settings',   icon: '⚙️', labelPl: 'Ustawienia', labelIt: 'Impostazioni' },
];

export function Layout({ children, currentPage, onNavigate, immersionMode = false }: {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  immersionMode?: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* Mobile header */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 bg-bg-card border-b border-border">
        <h1 className="text-lg font-bold text-accent">Italiano</h1>
        <button
          onClick={() => setMenuOpen(true)}
          className="p-2 text-text-dim hover:text-text"
          aria-label="Wszystkie moduły"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - desktop only */}
        <aside className="hidden md:flex w-64 flex-col bg-bg-card border-r border-border">
          <div className="p-5 border-b border-border">
            <h1 className="text-xl font-bold text-accent tracking-wide">Italiano</h1>
            <p className="text-xs text-text-dim mt-1">Impara l'italiano</p>
          </div>
          <Navigation currentPage={currentPage} onNavigate={onNavigate} immersionMode={immersionMode} />
        </aside>

        {/* Mobile full-menu overlay (all 13 items) */}
        {menuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black/60" onClick={() => setMenuOpen(false)}>
            <aside
              className="absolute right-0 top-0 w-72 h-full bg-bg-card border-l border-border flex flex-col animate-fade-in"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-5 border-b border-border">
                <h1 className="text-xl font-bold text-accent">{immersionMode ? 'Moduli' : 'Moduły'}</h1>
                <button onClick={() => setMenuOpen(false)} className="text-text-dim hover:text-text p-1">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 6l12 12M6 18L18 6" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <Navigation currentPage={currentPage} onNavigate={(page) => { onNavigate(page); setMenuOpen(false); }} immersionMode={immersionMode} />
              </div>
            </aside>
          </div>
        )}

        {/* Main content — pb-20 leaves room for bottom tab bar on mobile */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-4 md:p-6 pb-24 md:pb-6">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile bottom tab bar */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-bg-card border-t border-border flex">
        {BOTTOM_TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-colors ${
              currentPage === tab.id ? 'text-accent' : 'text-text-dim'
            }`}
          >
            <span className="text-xl leading-none">{tab.icon}</span>
            <span className="text-[10px] font-medium">{immersionMode ? tab.labelIt : tab.labelPl}</span>
          </button>
        ))}
        <button
          onClick={() => setMenuOpen(true)}
          className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-text-dim"
        >
          <span className="text-xl leading-none">☰</span>
          <span className="text-[10px] font-medium">Więcej</span>
        </button>
      </nav>
    </div>
  );
}
