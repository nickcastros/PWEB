import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './star-rating.html',
  styleUrls: ['./star-rating.scss'],
})
export class StarRatingComponent {
  @Input() max = 10;
  @Input() value = 0;
  @Output() valueChange = new EventEmitter<number>();

  hovered = 0;

  get displayValue() {
    return this.hovered || this.value;
  }

  setRating(rating: number) {
    this.value = rating;
    this.valueChange.emit(rating);
  }

  setHovered(rating: number) {
    this.hovered = rating;
  }

  clearHovered() {
    this.hovered = 0;
  }
}
