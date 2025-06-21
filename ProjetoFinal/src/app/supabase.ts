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
      .select(`full_name, avatar_url`)
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

  async addReview({
    api_id,
    title,
    poster_url,
    rating,
    content,
    user_id,
    review_id,
  }: {
    api_id: string;
    title: string;
    poster_url: string;
    rating: number;
    content: string;
    user_id: string;
    review_id?: string | null;
  }) {
    const { data: movie, error: movieError } = await this.supabase
      .from('movies')
      .upsert(
        {
          api_id,
          title,
          poster_url,
          updated_at: new Date(),
        },
        { onConflict: 'api_id', ignoreDuplicates: false }
      )
      .select()
      .single();

    if (movieError || !movie) {
      throw movieError || new Error('Erro ao salvar filme');
    }

    if (review_id) {
      // Atualiza review existente
      const { data: review, error: reviewError } = await this.supabase
        .from('reviews')
        .update({
          rating,
          content,
          created_at: new Date(),
        })
        .eq('id', review_id)
        .select()
        .single();

      if (reviewError) throw reviewError;
      return review;
    } else {
      // Insere novo review
      const { data: review, error: reviewError } = await this.supabase
        .from('reviews')
        .insert({
          movie_id: movie.id,
          user_id,
          rating,
          content,
          created_at: new Date(),
        })
        .select()
        .single();

      if (reviewError) throw reviewError;
      return review;
    }
  }
  async getUserReviewForMovie(api_id: string, user_id: string) {
    // Busca o filme pelo api_id para pegar o id interno
    const { data: movie, error: movieError } = await this.supabase
      .from('movies')
      .select('id')
      .eq('api_id', api_id)
      .single();

    if (movieError || !movie) {
      return null; // Filme ainda não existe na base
    }

    // Busca o review do usuário para esse filme
    const { data: review, error: reviewError } = await this.supabase
      .from('reviews')
      .select('*')
      .eq('movie_id', movie.id)
      .eq('user_id', user_id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (reviewError || !review) {
      return null;
    }

    return review;
  }
}
