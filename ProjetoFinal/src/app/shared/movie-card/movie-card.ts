import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss',
})
export class MovieCardComponent {
  @Input() title = '';
  @Input() posterUrl = '';

  get poster(): string {
    console.log();
    return 'assets/images/movie.png';
  }
}
