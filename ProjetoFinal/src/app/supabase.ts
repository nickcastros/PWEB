import { Injectable } from '@angular/core';
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';
import { environment } from '../environments/environment';
import { BehaviorSubject } from 'rxjs';

export interface Profile {
  id?: string;
  username: string;
  website: string;
  avatar_url: string;
}

@Injectable({
  providedIn: 'root',
})
export class Supabase {
  private supabase: SupabaseClient;
  _session: AuthSession | null = null;

  private sessionSubject = new BehaviorSubject<AuthSession | null>(null);
  session$ = this.sessionSubject.asObservable();
  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
    // Atualiza o subject ao iniciar
    this.supabase.auth.getSession().then(({ data }) => {
      this.sessionSubject.next(data.session);
    });
    // Escuta mudanças de autenticação
    this.supabase.auth.onAuthStateChange((_, session) => {
      this.sessionSubject.next(session);
    });
  }

  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session;
    });
    return this._session;
  }
  profile(user: User) {
    return this.supabase
      .from('profiles')
      .select(`full_name, email, avatar_url`)
      .eq('id', user.id)
      .single();
  }
  authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    return this.supabase.auth.onAuthStateChange(callback);
  }
  signUp(email: string, password: string) {
    return this.supabase.auth.signUp({ email, password });
  }

  signIn(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({ email, password });
  }
  signOut() {
    return this.supabase.auth.signOut();
  }
  updateProfile(profile: Profile) {
    const update = {
      ...profile,
      updated_at: new Date(),
    };
    return this.supabase.from('profiles').upsert(update);
  }
  downLoadImage(path: string) {
    return this.supabase.storage.from('avatars').download(path);
  }
  uploadAvatar(filePath: string, file: File) {
    return this.supabase.storage.from('avatars').upload(filePath, file);
  }
  async getSession(): Promise<AuthSession | null> {
    const { data } = await this.supabase.auth.getSession();
    this.sessionSubject.next(data.session);
    return data.session;
  }
}
