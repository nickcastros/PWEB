import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface MovieDetails {
  id: string;
  title: string;
  posterUrl: string;
  synopsis: string;
  genres: string[];
  director: string[];
  writers: string[];
  actors: string[];
  reviews: {
    user: string;
    rating: number | string;
    content: string;
  }[];
}

export function getMovieDetails(
  http: HttpClient,
  imdbId: string
): Observable<MovieDetails | null> {
  if (!imdbId) return of(null);

  return http
    .get<any>(`https://imdb.iamidiotareyoutoo.com/search?tt=${imdbId}`)
    .pipe(
      map((response) => {
        const data = response?.short;
        if (!data) return null;

        return {
          id: imdbId,
          title: data.name || '',
          posterUrl: data.image || 'assets/images/movie.png',
          synopsis: data.description || data.plot?.plotText?.plainText || '',
          genres: Array.isArray(data.genre)
            ? data.genre
            : data.genres?.genres?.map((g: any) => g.text) || [],
          director: (data.director || []).map((d: any) => d.name),
          writers: (data.creator || [])
            .filter((c: any) => c['@type'] === 'Person')
            .map((w: any) => w.name),
          actors: (data.actor || []).map((a: any) => a.name),
          reviews: data.review
            ? [
                {
                  user: data.review.author?.name || 'Usuário',
                  rating: data.review.reviewRating?.ratingValue || '',
                  content: data.review.reviewBody || '',
                },
              ]
            : [],
        };
      }),
      catchError(() => of(null))
    );
}
