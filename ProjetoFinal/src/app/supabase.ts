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
    releaseDate,
    genres,
    rating,
    content,
    user_id,
    review_id,
  }: {
    api_id: string;
    title: string;
    poster_url: string;
    releaseDate: Date | undefined;
    genres: string;
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
          releaseDate,
          genres,
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
  async getLastReviewsForMovie(api_id: string, exclude_user_id?: string) {
    // Busca o filme pelo api_id para pegar o id interno
    const { data: movie, error: movieError } = await this.supabase
      .from('movies')
      .select('id')
      .eq('api_id', api_id)
      .single();

    if (movieError || !movie) {
      return [];
    }

    let query = this.supabase
      .from('reviews')
      .select('id, user_id, rating, content, created_at,profiles(full_name)')
      .eq('movie_id', movie.id)
      .order('created_at', { ascending: false })
      .limit(10);

    if (exclude_user_id) {
      query = query.neq('user_id', exclude_user_id);
    }

    const { data: reviews, error: reviewsError } = await query;

    if (reviewsError || !reviews) {
      return [];
    }

    // Mapeia para o formato esperado pelo ReviewCard
    return reviews.map((r: any) => ({
      user: r.profiles?.full_name || 'Usuário',
      rating: r.rating,
      content: r.content,
    }));
  }
  async getMovieRating(api_id: string) {
    const { data: movie, error } = await this.supabase
      .from('movies')
      .select('avg_rating, reviews_qty')
      .eq('api_id', api_id)
      .single();

    if (error || !movie) {
      return { avg_rating: 0, reviews_qty: 0 };
    }

    return {
      avg_rating: movie.avg_rating ?? 0,
      reviews_qty: movie.reviews_qty ?? 0,
    };
  }

  async getUserReviews(user_id: string) {
    // Busca as reviews do usuário, trazendo dados do filme relacionado
    const { data: reviews, error } = await this.supabase
      .from('reviews')
      .select(
        'id, rating, content, created_at, movies(title, poster_url, api_id,genres), profiles(full_name, avatar_url)'
      )
      .eq('user_id', user_id)
      .order('created_at', { ascending: false });

    if (error || !reviews) {
      return [];
    }
    return reviews.map((r: any) => ({
      id: r.id,
      name: r.movies?.title || 'Filme',
      posterUrl: r.movies?.poster_url || '',
      apiId: r.movies?.api_id || '',
      genres: Array.isArray(r.movies?.genres)
        ? r.movies.genres
        : typeof r.movies?.genres === 'string' && r.movies.genres.length > 0
        ? r.movies.genres.split(',').map((g: string) => g.trim())
        : [],
      rating: r.rating,
      review: r.content,
      createdAt: r.created_at,
      user: r.profiles?.full_name || 'Usuário',
      avatar: r.profiles?.avatar_url || 'assets/images/profile.png',
    }));
  }

  async deleteReview(review_id: string) {
    const { error } = await this.supabase
      .from('reviews')
      .delete()
      .eq('id', review_id);

    if (error) throw error;
  }

  async getTop10Movies() {
    const { data: movies, error } = await this.supabase
      .from('movies')
      .select('api_id, title, poster_url, avg_rating, reviews_qty, genres')
      .order('avg_rating', { ascending: false })
      .order('reviews_qty', { ascending: false })
      .limit(10);

    if (error || !movies) {
      return [];
    }

    // Mapeia para o formato desejado no seu card
    return movies.map((m: any, idx: number) => ({
      id: m.api_id,
      title: m.title,
      posterUrl: m.poster_url,
      rating: m.avg_rating,
      reviewsQty: m.reviews_qty,
      position: idx + 1,
      genres: Array.isArray(m.genres)
        ? m.genres
        : typeof m.genres === 'string' && m.genres.length > 0
        ? m.genres.split(',').map((g: string) => g.trim())
        : [],
    }));
  }
  async getPopularMoviesLast7Days() {
    // Busca reviews dos últimos 7 dias, trazendo dados do filme
    const { data: reviews, error } = await this.supabase
      .from('reviews')
      .select('movie_id, movies(title, poster_url, api_id, genres), created_at')
      .gte(
        'created_at',
        new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      );

    if (error || !reviews) {
      return [];
    }

    // Agrupa e conta reviews por filme no JS
    const movieMap: Record<string, any> = {};
    for (const r of reviews) {
      const movie = Array.isArray(r.movies) ? r.movies[0] : r.movies;
      const id = movie?.api_id;
      if (!id) continue;
      if (!movieMap[id]) {
        movieMap[id] = {
          id,
          title: movie?.title,
          posterUrl: movie?.poster_url,
          reviewsQty: 0,
        };
      }
      movieMap[id].reviewsQty++;
    }

    // Ordena e pega os 5 mais populares
    return Object.values(movieMap)
      .sort((a: any, b: any) => b.reviewsQty - a.reviewsQty)
      .slice(0, 5);
  }
}
