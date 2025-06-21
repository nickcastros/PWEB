import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface MovieSearchResult {
  id: string;
  title: string;
  posterUrl: string;
  year?: number;
  imdbUrl?: string;
  actors?: string;
  [key: string]: any;
}

export function searchMovies(
  http: HttpClient,
  query: string
): Observable<MovieSearchResult[]> {
  if (!query || typeof query !== 'string' || query.trim() === '') {
    return of([]);
  }
  return http
    .get<any>(
      `https://imdb.iamidiotareyoutoo.com/search?q=${encodeURIComponent(query)}`
    )
    .pipe(
      map((response) =>
        Array.isArray(response?.description)
          ? response.description.map((item: any, idx: number) => ({
              id: item['#IMDB_ID']?.toString() || idx.toString(),
              title: item['#TITLE'] || '',
              posterUrl: item['#IMG_POSTER'] || '',
            }))
          : []
      )
    );
}
