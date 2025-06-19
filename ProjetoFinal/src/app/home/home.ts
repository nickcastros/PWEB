import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../shared/input/input';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MovieCardComponent } from '../shared/movie-card/movie-card';

@Component({
  selector: 'app-home',
  imports: [CommonModule, InputComponent, MovieCardComponent],
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
    { title: 'Karate Kid', posterUrl: 'https://image.tmdb.org/t/p/w200/1.jpg' },
    { title: 'Matrix', posterUrl: 'https://image.tmdb.org/t/p/w200/2.jpg' },
    {
      title: 'Interestelar',
      posterUrl: 'https://image.tmdb.org/t/p/w200/3.jpg',
    },
    { title: 'Avangers', posterUrl: 'https://image.tmdb.org/t/p/w200/2.jpg' },

    { title: 'Ad Astra', posterUrl: 'https://image.tmdb.org/t/p/w200/2.jpg' },
  ];

  get controls() {
    return this.searchForm.controls;
  }
}
