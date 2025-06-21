import { Component, Input } from '@angular/core';
import { Chip } from '../chip/chip';
import { CommonModule } from '@angular/common';
import { RatingStars } from '../rating-stars/rating-stars';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-toplist-card',
  imports: [Chip, CommonModule, RatingStars, RouterLink],
  templateUrl: './toplist-card.html',
  styleUrl: './toplist-card.scss',
})
export class ToplistCard {
  @Input() movie!: {
    id: string;
    position: number;
    title: string;
    posterUrl: string;
    rating: number;
    genres: [];
  };

  get poster(): string {
    return 'assets/images/movie.png';
  }
}
