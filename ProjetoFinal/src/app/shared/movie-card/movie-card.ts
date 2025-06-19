import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-movie-card',
  standalone: true,
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss',
})
export class MovieCardComponent {
  @Input() movie!: {
    id?: number;
    title: string;
    posterUrl: string;
  };

  get poster(): string {
    return 'assets/images/movie.png';
  }
}
