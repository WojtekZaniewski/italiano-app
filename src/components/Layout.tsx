import { useState } from 'react';
import type { ReactNode } from 'react';
import { Navigation } from './Navigation';

export function Layout({ children, currentPage, onNavigate }: {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* Mobile header */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 bg-bg-card border-b border-border">
        <h1 className="text-lg font-bold text-accent">Italiano</h1>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 text-text-dim hover:text-text"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </header>

      <div className="flex flex-1">
        {/* Sidebar - desktop */}
        <aside className="hidden md:flex w-64 flex-col bg-bg-card border-r border-border">
          <div className="p-5 border-b border-border">
            <h1 className="text-xl font-bold text-accent tracking-wide">Italiano</h1>
            <p className="text-xs text-text-dim mt-1">Impara l'italiano</p>
          </div>
          <Navigation currentPage={currentPage} onNavigate={onNavigate} />
        </aside>

        {/* Mobile menu overlay */}
        {menuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black/60" onClick={() => setMenuOpen(false)}>
            <aside className="w-64 h-full bg-bg-card border-r border-border animate-fade-in" onClick={e => e.stopPropagation()}>
              <div className="p-5 border-b border-border">
                <h1 className="text-xl font-bold text-accent">Italiano</h1>
              </div>
              <Navigation currentPage={currentPage} onNavigate={(page) => { onNavigate(page); setMenuOpen(false); }} />
            </aside>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-4 md:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
