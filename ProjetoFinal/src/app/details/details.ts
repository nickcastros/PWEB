import { Component } from '@angular/core';
import { RatingStars } from '../shared/rating-stars/rating-stars';
import { Chip } from '../shared/chip/chip';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from '../shared/star-rating/star-rating';

@Component({
  selector: 'app-details',
  imports: [RatingStars, Chip, CommonModule, StarRatingComponent],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details {
  movie = {
    id: 1,
    position: 1,
    title: 'Karate Kid',
    posterUrl: '',
    rating: 10,
    genres: ['Ação', 'Aventura', 'SciFi'],
    synopsis: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam commodo hendrerit metus et accumsan.
        Aliquam eros lorem, pretium vitae iaculis sed, posuere eget enim. Duis justo velit, porta imperdiet lacus ut,
        congue efficitur diam. Donec nec ante ante. Mauris luctus nulla sed suscipit blandit. Aenean feugiat arcu a ligula dapibus,
        ac feugiat libero blandit. Curabitur aliquam varius vehicula. Vivamus sodales nunc diam. Vivamus neque orci,
        iaculis id fermentum vel, finibus feugiat est. Cras efficitur tellus eget sapien interdum, id luctus nisl condimentum.`,
    director: ['Sam Raimi'],
    writers: ['Stan Lee', ' Keop', 'Ditko David'],
    actors: ['Tobey Maguire', ' Kirsten Dunst', 'Willem Dafoe'],
  };

  get poster(): string {
    return 'assets/images/movie.png';
  }
}
