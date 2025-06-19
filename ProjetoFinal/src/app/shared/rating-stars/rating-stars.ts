import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating-stars',
  imports: [],
  templateUrl: './rating-stars.html',
  styleUrl: './rating-stars.scss',
})
export class RatingStars {
  @Input() rating = 10;
}
