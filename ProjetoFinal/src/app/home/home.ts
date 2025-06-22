import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { MovieCardComponent } from '../shared/movie-card/movie-card';
import { ToplistCard } from '../shared/toplist-card/toplist-card';
import { InputRoundedComponent } from '../shared/input-rounded/input-rounded';
import { SelectRoundedComponent } from '../shared/select-rounded/select-rounded';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { searchMovies, MovieSearchResult } from '../helpers/movie-search';
import { Supabase } from '../supabase';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    MovieCardComponent,
    ToplistCard,
    InputRoundedComponent,
    SelectRoundedComponent,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  searchResults: MovieSearchResult[] = [];
  top10: {
    id: any;
    title: any;
    posterUrl: any;
    rating: any;
    reviewsQty: any;
    position: number;
    genres: [];
  }[] = [];

  recent: {
    id: string;
    title: string;
    posterUrl: string;
  }[] = [];

  popular: {
    id: string;
    title: string;
    posterUrl: string;
    reviewsQty: number;
  }[] = [];

  upcomingMovies: {
    id: string;
    title: string;
    posterUrl: string;
  }[] = [];

  constructor(private http: HttpClient, private supabase: Supabase) {
    this.searchForm
      .get('nome')!
      .valueChanges.pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((query) => searchMovies(this.http, query ?? ''))
      )
      .subscribe((results) => {
        this.searchResults = results;
      });
  }
  async ngOnInit() {
    this.top10 = await this.supabase.getTop10Movies();
    this.popular = await this.supabase.getPopularMoviesLast7Days();
    this.recent = await this.supabase.getRecentMovies();
    this.upcomingMovies = await this.supabase.getUpcomingMovies();
  }
  searchForm = new FormGroup({
    nome: new FormControl(''),
    genero: new FormControl(''),
    ano: new FormControl(''),
  });

  movies = [
    { id: '1', title: 'Karate Kid', posterUrl: '' },
    { id: '2', title: 'Matrix', posterUrl: '' },
    { id: '3', title: 'Interestelar', posterUrl: '' },
    { id: '4', title: 'Avangers', posterUrl: '' },
    { id: '5', title: 'Ad Astra', posterUrl: '' },
  ];

  generos = [
    { value: '', label: 'Selecione' },
    { value: 'acao', label: 'Ação' },
    { value: 'aventura', label: 'Aventura' },
  ];

  anos = Array.from({ length: 100 }, (_, i) => {
    const year = 2025 - i;
    return { value: year, label: year.toString() };
  });

  get controls() {
    return this.searchForm.controls;
  }
}
