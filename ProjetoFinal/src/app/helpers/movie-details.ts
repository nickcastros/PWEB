import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface MovieDetails {
  id: string;
  title: string;
  posterUrl: string;
  releaseDate: Date | undefined;
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

        const result = {
          id: imdbId,
          title: decodeHtml(data.name || ''),
          posterUrl: data.image || 'assets/images/movie.png',
          releaseDate: data.datePublished
            ? new Date(data.datePublished)
            : undefined,
          synopsis: decodeHtml(
            data.description || data.plot?.plotText?.plainText || ''
          ),
          genres: Array.isArray(data.genre)
            ? data.genre.map((g: string) => decodeHtml(g))
            : data.genres?.genres?.map((g: any) => decodeHtml(g.text)) || [],
          director: (data.director || []).map((d: any) => decodeHtml(d.name)),
          writers: (data.creator || [])
            .filter((c: any) => c['@type'] === 'Person')
            .map((w: any) => decodeHtml(w.name)),
          actors: (data.actor || []).map((a: any) => decodeHtml(a.name)),
          reviews: data.review
            ? [
                {
                  user: decodeHtml(data.review.author?.name || 'Usuário'),
                  rating: data.review.reviewRating?.ratingValue || '',
                  content: decodeHtml(data.review.reviewBody || ''),
                },
              ]
            : [],
        };
        return result;
      }),
      catchError(() => of(null))
    );
}

export function decodeHtml(html: string): string {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}
