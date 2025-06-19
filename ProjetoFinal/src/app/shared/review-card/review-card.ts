import { Component, Input } from '@angular/core';
import { RatingStars } from '../rating-stars/rating-stars';

@Component({
  selector: 'app-review-card',
  imports: [RatingStars],
  templateUrl: './review-card.html',
  styleUrl: './review-card.scss',
})
export class ReviewCard {
  @Input() review!: {
    user: string;
    rating: number;
    content: string;
  };
}
