import { Component, Input } from '@angular/core';
import { Chip } from '../chip/chip';
import { CommonModule } from '@angular/common';
import { RatingStars } from '../rating-stars/rating-stars';

@Component({
  selector: 'app-my-reviews-card',
  imports: [Chip, CommonModule, RatingStars],
  templateUrl: './my-reviews-card.html',
  styleUrl: './my-reviews-card.scss',
})
export class MyReviewsCard {
  @Input() review!: {
    id: number;
    name: string;
    rating: number;
    porsterUrl: string;
    review: string;
  };

  get poster(): string {
    return 'assets/images/movie.png';
  }

  genres = ['Ação', 'Aventura', 'Comédia', 'SciFi'];
}
