import { Component } from '@angular/core';
import { MyReviewsCard } from '../shared/my-reviews-card/my-reviews-card';
import { CommonModule } from '@angular/common';
import { Chip } from '../shared/chip/chip';

@Component({
  selector: 'app-my-reviews',
  imports: [MyReviewsCard, CommonModule, Chip],
  templateUrl: './my-reviews.html',
  styleUrl: './my-reviews.scss',
})
export class MyReviews {
  get profile(): string {
    return 'assets/images/profile.png';
  }

  user = {
    id: 1,
    name: 'Nicolas Castro',
    profileUrl: '',
    reviews: [
      {
        id: 1,
        name: 'Missão Impossível',
        rating: 10,
        porsterUrl: '',
        review:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam commodo hendrerit metus et accumsan. Aliquam eros lorem, pretium vitae iaculis sed, posuere eget enim. Duis justo velit, porta imperdiet lacus ut, congue efficitur diam. Donec nec ante ante. Mauris luctus nulla sed suscipit blandit. Aenean feugiat arcu a ligula dapibus, ac feugiat libero blandit. Curabitur aliquam varius vehicula. Vivamus sodales nunc diam. Vivamus neque orci, iaculis id fermentum vel, finibus feugiat est. Cras efficitur tellus eget sapien interdum, id luctus nisl condimentum.',
      },
      {
        id: 2,
        name: 'Avagers',
        rating: 8,
        porsterUrl: '',
        review:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam commodo hendrerit metus et accumsan. Aliquam eros lorem, pretium vitae iaculis sed, posuere eget enim. Duis justo velit, porta imperdiet lacus ut, congue efficitur diam. Donec nec ante ante. Mauris luctus nulla sed suscipit blandit. Aenean feugiat arcu a ligula dapibus, ac feugiat libero blandit. Curabitur aliquam varius vehicula. Vivamus sodales nunc diam. Vivamus neque orci, iaculis id fermentum vel, finibus feugiat est. Cras efficitur tellus eget sapien interdum, id luctus nisl condimentum.',
      },
      {
        id: 3,
        name: 'Ford vs Ferrari',
        rating: 9.5,
        porsterUrl: '',
        review:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam commodo hendrerit metus et accumsan. Aliquam eros lorem, pretium vitae iaculis sed, posuere eget enim. Duis justo velit, porta imperdiet lacus ut, congue efficitur diam. Donec nec ante ante. Mauris luctus nulla sed suscipit blandit. Aenean feugiat arcu a ligula dapibus, ac feugiat libero blandit. Curabitur aliquam varius vehicula. Vivamus sodales nunc diam. Vivamus neque orci, iaculis id fermentum vel, finibus feugiat est. Cras efficitur tellus eget sapien interdum, id luctus nisl condimentum.',
      },
    ],
  };
}
