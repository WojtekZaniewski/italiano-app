import { supabase } from './supabase';
import type { UserProgress, SRSCard, GoldlistEntry, WritingSubmission } from '../types';

export interface ErrorRecord {
  patternId: string;
  label: string;
  type: 'grammar' | 'spelling' | 'word_choice' | 'style';
  count: number;
  lastSeen: string;
}

export interface CloudData {
  progress: UserProgress;
  srsCards: SRSCard[];
  goldlist: GoldlistEntry[];
  writings: WritingSubmission[];
  writingErrors: ErrorRecord[];
}

export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export async function signIn(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signUp(email: string, password: string) {
  return supabase.auth.signUp({ email, password });
}

export async function signOut() {
  return supabase.auth.signOut();
}

export async function loadFromCloud(): Promise<CloudData | null> {
  try {
    const session = await getSession();
    if (!session) return null;

    const { data, error } = await supabase
      .from('user_data')
      .select('progress, srs_cards, goldlist, writings, writing_errors')
      .eq('user_id', session.user.id)
      .maybeSingle();

    if (error || !data) return null;

    return {
      progress:      data.progress       as UserProgress,
      srsCards:      (data.srs_cards     as SRSCard[])       ?? [],
      goldlist:      (data.goldlist      as GoldlistEntry[])  ?? [],
      writings:      (data.writings      as WritingSubmission[]) ?? [],
      writingErrors: (data.writing_errors as ErrorRecord[])   ?? [],
    };
  } catch {
    return null;
  }
}

export async function saveToCloud(cloudData: CloudData): Promise<void> {
  try {
    const session = await getSession();
    if (!session) return;

    await supabase
      .from('user_data')
      .upsert(
        {
          user_id:        session.user.id,
          progress:       cloudData.progress,
          srs_cards:      cloudData.srsCards,
          goldlist:       cloudData.goldlist,
          writings:       cloudData.writings,
          writing_errors: cloudData.writingErrors,
        },
        { onConflict: 'user_id' },
      );
  } catch {
    // Swallow — localStorage already saved, will retry on next change
  }
}

export function mergeOnLogin(
  local: CloudData,
  cloud: CloudData,
): { winner: CloudData; source: 'local' | 'cloud' } {
  const localXp = local.progress?.totalXp ?? 0;
  const cloudXp = cloud.progress?.totalXp ?? 0;

  if (localXp >= cloudXp) {
    return { winner: local, source: 'local' };
  }
  return { winner: cloud, source: 'cloud' };
}
