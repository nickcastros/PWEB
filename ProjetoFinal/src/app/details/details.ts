import { Component } from '@angular/core';
import { RatingStars } from '../shared/rating-stars/rating-stars';
import { Chip } from '../shared/chip/chip';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from '../shared/star-rating/star-rating';
import { ReviewInputComponent } from '../shared/review-input/review-input';
import { FormControl } from '@angular/forms';
import { ReviewCard } from '../shared/review-card/review-card';
import { ActivatedRoute, Router } from '@angular/router';
import { Supabase } from '../supabase';
import { getMovieDetails, MovieDetails } from '../helpers/movie-details';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-details',
  imports: [
    RatingStars,
    Chip,
    CommonModule,
    StarRatingComponent,
    ReviewInputComponent,
    ReviewCard,
  ],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details {
  isLoggedIn = false;
  movie: MovieDetails | null = null;

  constructor(
    private supabase: Supabase,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.supabase.session$.subscribe((session) => {
      this.isLoggedIn = !!session?.user;
    });

    this.route.paramMap.subscribe((params) => {
      const imdbId = params.get('id');
      if (imdbId) {
        getMovieDetails(this.http, imdbId).subscribe((movie) => {
          this.movie = movie;
        });
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/auth']);
  }
  reviewControl = new FormControl('');
  reviews = [
    {
      user: 'User1',
      rating: 10,
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam commodo hendrerit metus et accumsan. Aliquam eros lorem, pretium vitae iaculis sed, posuere eget enim. Duis justo velit, porta imperdiet lacus ut, congue efficitur diam. Donec nec ante ante. Mauris luctus nulla sed suscipit blandit. Aenean feugiat arcu a ligula dapibus, ac feugiat libero blandit. Curabitur aliquam varius vehicula. Vivamus sodales nunc diam. Vivamus neque orci, iaculis id fermentum vel, finibus feugiat est. Cras efficitur tellus eget sapien interdum, id luctus nisl condimentum.',
    },
    {
      user: 'User2',
      rating: 9,
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam commodo hendrerit metus et accumsan. Aliquam eros lorem, pretium vitae iaculis sed, posuere eget enim. Duis justo velit, porta imperdiet lacus ut, congue efficitur diam. Donec nec ante ante. Mauris luctus nulla sed suscipit blandit. Aenean feugiat arcu a ligula dapibus, ac feugiat libero blandit. Curabitur aliquam varius vehicula. Vivamus sodales nunc diam. Vivamus neque orci, iaculis id fermentum vel, finibus feugiat est. Cras efficitur tellus eget sapien interdum, id luctus nisl condimentum.',
    },
    {
      user: 'User3',
      rating: 9.5,
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam commodo hendrerit metus et accumsan. Aliquam eros lorem, pretium vitae iaculis sed, posuere eget enim. Duis justo velit, porta imperdiet lacus ut, congue efficitur diam. Donec nec ante ante. Mauris luctus nulla sed suscipit blandit. Aenean feugiat arcu a ligula dapibus, ac feugiat libero blandit. Curabitur aliquam varius vehicula. Vivamus sodales nunc diam. Vivamus neque orci, iaculis id fermentum vel, finibus feugiat est. Cras efficitur tellus eget sapien interdum, id luctus nisl condimentum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam commodo hendrerit metus et accumsan. Aliquam eros lorem, pretium vitae iaculis sed, posuere eget enim. Duis justo velit, porta imperdiet lacus ut, congue efficitur diam. Donec nec ante ante. Mauris luctus nulla sed suscipit blandit. Aenean feugiat arcu a ligula dapibus, ac feugiat libero blandit. Curabitur aliquam varius vehicula. Vivamus sodales nunc diam. Vivamus neque orci, iaculis id fermentum vel, finibus feugiat est. Cras efficitur tellus eget sapien interdum, id luctus nisl condimentum.',
    },
  ];

  get poster(): string {
    return 'assets/images/movie.png';
  }
}
