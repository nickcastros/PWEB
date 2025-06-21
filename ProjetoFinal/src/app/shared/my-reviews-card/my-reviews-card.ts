import { Component, EventEmitter, Input, Output } from '@angular/core';
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
    id: string;
    apiId: string;
    name: string;
    rating: number;
    posterUrl: string;
    review: string;
    genres: [];
  };
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<string>();

  get poster(): string {
    return 'assets/images/movie.png';
  }
}
