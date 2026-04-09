import { useState, useEffect, useCallback, useRef, lazy, Suspense } from 'react';
import { Layout } from './components/Layout';
import type { UserProgress, SRSCard, CEFRLevel } from './types';
import { loadProgress, saveProgress, loadSRSCards, saveSRSCards, loadGoldlist, loadWritings, saveGoldlist, saveWritings } from './engine/storage';
import { addXp, updateStreak, checkAchievements } from './engine/scoring';
import { saveToCloud, mergeOnLogin } from './engine/cloudSync';
import type { CloudData } from './engine/cloudSync';
import { AuthGate } from './components/AuthGate';
import { allVocabulary } from './data/all-vocabulary';
import { grammarLessons } from './data/grammar';
import { allScenarios } from './data/all-scenarios';
import { allReadings } from './data/all-readings';
import { placementQuestions } from './data/placement';

// Eagerly loaded (used on startup / very frequently)
import { Dashboard } from './components/Dashboard';
import { DailySession } from './components/DailySession';

// Lazy-loaded page components (split into separate chunks)
const FlashCards = lazy(() => import('./components/FlashCard').then(m => ({ default: m.FlashCards })));
const PlacementTest = lazy(() => import('./components/PlacementTest').then(m => ({ default: m.PlacementTest })));
const GrammarBuilder = lazy(() => import('./components/GrammarBuilder').then(m => ({ default: m.GrammarBuilder })));
const ScenarioMode = lazy(() => import('./components/ScenarioMode').then(m => ({ default: m.ScenarioMode })));
const ReadingModule = lazy(() => import('./components/ReadingModule').then(m => ({ default: m.ReadingModule })));
const ShadowingModule = lazy(() => import('./components/ShadowingModule').then(m => ({ default: m.ShadowingModule })));
const WritingPractice = lazy(() => import('./components/WritingPractice').then(m => ({ default: m.WritingPractice })));
const GoldlistModule = lazy(() => import('./components/GoldlistModule').then(m => ({ default: m.GoldlistModule })));
const ListeningModule = lazy(() => import('./components/ListeningModule').then(m => ({ default: m.ListeningModule })));
const MaturitaModule = lazy(() => import('./components/MaturitaModule').then(m => ({ default: m.MaturitaModule })));
const Settings = lazy(() => import('./components/Settings').then(m => ({ default: m.Settings })));

function PageSpinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState('dashboard');
  const [progress, setProgress] = useState<UserProgress>(loadProgress);
  const [cards, setCards] = useState<SRSCard[]>(loadSRSCards);

  const cloudSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleSave = useCallback((p: UserProgress, c: SRSCard[]) => {
    if (cloudSaveTimer.current) clearTimeout(cloudSaveTimer.current);
    cloudSaveTimer.current = setTimeout(() => {
      const data: CloudData = {
        progress: p,
        srsCards: c,
        goldlist: loadGoldlist(),
        writings: loadWritings(),
        writingErrors: JSON.parse(localStorage.getItem('italiano_writing_errors') ?? '[]'),
      };
      saveToCloud(data);
    }, 2000);
  }, []);

  const handleCloudLoad = useCallback((cloudData: CloudData) => {
    const local: CloudData = {
      progress,
      srsCards: cards,
      goldlist: loadGoldlist(),
      writings: loadWritings(),
      writingErrors: JSON.parse(localStorage.getItem('italiano_writing_errors') ?? '[]'),
    };
    const { winner, source } = mergeOnLogin(local, cloudData);
    if (source === 'cloud') {
      setProgress(winner.progress);
      setCards(winner.srsCards);
      saveGoldlist(winner.goldlist);
      saveWritings(winner.writings);
      localStorage.setItem('italiano_writing_errors', JSON.stringify(winner.writingErrors));
    }
    saveToCloud(winner);
  }, [progress, cards]);

  useEffect(() => { saveProgress(progress); scheduleSave(progress, cards); }, [progress]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { saveSRSCards(cards); scheduleSave(progress, cards); }, [cards]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const handler = () => scheduleSave(progress, cards);
    window.addEventListener('italiano_data_changed', handler);
    return () => window.removeEventListener('italiano_data_changed', handler);
  }, [progress, cards, scheduleSave]);

  useEffect(() => {
    setProgress(p => updateStreak(p));
  }, []);

  const handleXp = useCallback((xp: number) => {
    setProgress(p => {
      let updated = addXp(p, xp);
      const newAchievements = checkAchievements(updated);
      if (newAchievements.length > 0) {
        updated = { ...updated, achievements: [...updated.achievements, ...newAchievements] };
      }
      return updated;
    });
  }, []);

  const handleUpdateCards = useCallback((newCards: SRSCard[]) => {
    setCards(newCards);
    setProgress(p => ({ ...p, wordsLearned: newCards.filter(c => c.box >= 3).length }));
  }, []);

  const handlePlacementComplete = useCallback((level: CEFRLevel, _score: number) => {
    setProgress(p => ({
      ...p,
      level,
      placementTestTaken: true,
      placementTestDate: new Date().toISOString().split('T')[0],
    }));
    handleXp(200);
    setPage('dashboard');
  }, [handleXp]);

  const handleSessionComplete = useCallback(() => {
    setProgress(p => ({
      ...p,
      sessionsCompleted: p.sessionsCompleted + 1,
      totalMinutes: p.totalMinutes + 20,
    }));
    setPage('dashboard');
  }, []);

  const renderPage = () => {
    switch (page) {
      case 'dashboard':
        return <Dashboard progress={progress} cards={cards} onNavigate={setPage} />;

      case 'session':
        return (
          <DailySession
            cards={cards}
            onUpdateCards={handleUpdateCards}
            onXp={handleXp}
            onComplete={handleSessionComplete}
            userLevel={progress.level}
            availableVocab={allVocabulary}
            settings={progress.settings.sessionSplit}
          />
        );

      case 'flashcards':
        return (
          <FlashCards
            cards={cards}
            onUpdateCards={handleUpdateCards}
            onXp={handleXp}
            availableVocab={allVocabulary}
            userLevel={progress.level}
          />
        );

      case 'grammar':
        return (
          <GrammarBuilder
            lessons={grammarLessons}
            userLevel={progress.level}
            onXp={handleXp}
          />
        );

      case 'scenarios':
        return (
          <ScenarioMode
            scenarios={allScenarios}
            userLevel={progress.level}
            onXp={handleXp}
          />
        );

      case 'reading':
        return (
          <ReadingModule
            texts={allReadings}
            userLevel={progress.level}
            onXp={handleXp}
          />
        );

      case 'listening':
        return (
          <ListeningModule
            userLevel={progress.level}
            onXp={handleXp}
          />
        );

      case 'shadowing':
        return (
          <ShadowingModule
            userLevel={progress.level}
            onXp={handleXp}
          />
        );

      case 'writing':
        return (
          <WritingPractice
            userLevel={progress.level}
            onXp={handleXp}
          />
        );

      case 'goldlist':
        return <GoldlistModule onXp={handleXp} />;

      case 'maturita':
        return <MaturitaModule onXp={handleXp} />;

      case 'placement':
        return (
          <PlacementTest
            questions={placementQuestions}
            onComplete={handlePlacementComplete}
          />
        );

      case 'settings':
        return (
          <Settings
            progress={progress}
            onUpdate={setProgress}
          />
        );

      default:
        return <Dashboard progress={progress} cards={cards} onNavigate={setPage} />;
    }
  };

  return (
    <AuthGate onCloudLoad={handleCloudLoad}>
      <Layout currentPage={page} onNavigate={setPage} immersionMode={progress.settings.immersionMode}>
        <Suspense fallback={<PageSpinner />}>
          {renderPage()}
        </Suspense>
      </Layout>
    </AuthGate>
  );
}
