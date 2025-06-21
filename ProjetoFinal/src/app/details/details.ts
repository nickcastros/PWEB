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
import { combineLatest, filter, switchMap } from 'rxjs';

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
  selectedRating = 0;
  userReviewId: string | null = null;
  ratingInfo: number = 0;
  reviews: {
    user: any;
    rating: any;
    content: any;
  }[] = [];

  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private supabase: Supabase,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    combineLatest([this.supabase.session$, this.route.paramMap])
      .pipe(
        filter(([session, params]) => !!params.get('id')),
        switchMap(([session, params]) => {
          this.isLoggedIn = !!session?.user;
          const userId = session?.user?.id;
          const imdbId = params.get('id')!;
          return getMovieDetails(this.http, imdbId).pipe(
            switchMap(async (movie) => {
              this.movie = movie;
              if (userId && movie) {
                const review = await this.supabase.getUserReviewForMovie(
                  movie.id,
                  userId
                );
                if (review) {
                  this.selectedRating = review.rating;
                  this.reviewControl.setValue(review.content);
                  this.userReviewId = review.id;
                } else {
                  this.selectedRating = 0;
                  this.reviewControl.setValue('');
                  this.userReviewId = null;
                }
              }
              if (movie) {
                const rawReviews = await this.supabase.getLastReviewsForMovie(
                  movie.id,
                  userId
                );
                this.reviews = rawReviews.map((review: any) => ({
                  user: review.user ?? review.user_id ?? 'Usuário',
                  rating: review.rating,
                  content: review.content,
                }));
                this.ratingInfo = (
                  await this.supabase.getMovieRating(movie.id)
                ).avg_rating;
              }
            })
          );
        })
      )
      .subscribe();
  }

  goToLogin() {
    this.router.navigate(['/auth']);
  }

  async sendReview() {
    if (!this.movie || !this.isLoggedIn) return;

    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    const session = await this.supabase.getSession();
    const userId = session?.user?.id;
    if (!userId) {
      this.isLoading = false;
      return;
    }

    const userRating = this.selectedRating;
    const userReview = this.reviewControl.value;

    const review = await this.supabase.getUserReviewForMovie(
      this.movie.id,
      userId
    );
    if (review) {
      this.selectedRating = review.rating;
      this.reviewControl.setValue(review.content);
      this.userReviewId = review.id; // Salva o id do review
    }

    try {
      await this.supabase.addReview({
        api_id: this.movie.id,
        title: this.movie.title,
        poster_url: this.movie.posterUrl,
        releaseDate: this.movie.releaseDate,
        genres: Array.isArray(this.movie.genres)
          ? this.movie.genres.join(', ')
          : this.movie.genres,
        rating: userRating,
        content: userReview ?? '',
        user_id: userId,
        review_id: this.userReviewId,
      });
      this.successMessage = 'Avaliação enviada com sucesso!';
      const updatedReview = await this.supabase.getUserReviewForMovie(
        this.movie.id,
        userId
      );
      if (updatedReview) {
        this.selectedRating = updatedReview.rating;
        this.reviewControl.setValue(updatedReview.content);
        this.userReviewId = updatedReview.id;
      }
    } catch (e) {
      this.errorMessage = 'Erro ao enviar avaliação. Tente novamente.';
    } finally {
      this.isLoading = false;
    }
  }

  reviewControl = new FormControl('');

  get poster(): string {
    return 'assets/images/movie.png';
  }
}
