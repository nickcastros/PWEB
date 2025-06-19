import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MovieCardComponent } from '../shared/movie-card/movie-card';
import { ToplistCard } from '../shared/toplist-card/toplist-card';
import { InputRoundedComponent } from '../shared/input-rounded/input-rounded';
import { SelectRoundedComponent } from '../shared/select-rounded/select-rounded';

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
export class Home {
  searchForm = new FormGroup({
    nome: new FormControl(''),
    genero: new FormControl(''),
    ano: new FormControl(''),
  });

  movies = [
    { id: 1, title: 'Karate Kid', posterUrl: '' },
    { id: 2, title: 'Matrix', posterUrl: '' },
    { id: 3, title: 'Interestelar', posterUrl: '' },
    { id: 4, title: 'Avangers', posterUrl: '' },
    { id: 5, title: 'Ad Astra', posterUrl: '' },
  ];

  top10 = [
    { id: 1, position: 1, title: 'Karate Kid', posterUrl: '', rating: 10 },
    { id: 2, position: 2, title: 'Matrix', posterUrl: '', rating: 9.5 },
    { id: 3, position: 3, title: 'Interestelar', posterUrl: '', rating: 9.3 },
    { id: 4, position: 4, title: 'Avangers', posterUrl: '', rating: 9.0 },
    {
      id: 5,
      position: 5,
      title: 'O Poderoso Chefão',
      posterUrl: '',
      rating: 8.9,
    },
    { id: 6, position: 6, title: 'Ad Astra', posterUrl: '', rating: 8.75 },
    { id: 7, position: 7, title: 'Ad Astra', posterUrl: '', rating: 8.5 },
    { id: 8, position: 8, title: 'Ad Astra', posterUrl: '', rating: 8.25 },
    { id: 9, position: 9, title: 'Ad Astra', posterUrl: '', rating: 8 },
    { id: 10, position: 10, title: 'Ad Astra', posterUrl: '', rating: 7.95 },
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
