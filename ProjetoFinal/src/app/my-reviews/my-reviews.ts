import { Component } from '@angular/core';
import { MyReviewsCard } from '../shared/my-reviews-card/my-reviews-card';
import { CommonModule } from '@angular/common';
import { Supabase } from '../supabase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-reviews',
  imports: [MyReviewsCard, CommonModule],
  templateUrl: './my-reviews.html',
  styleUrl: './my-reviews.scss',
})
export class MyReviews {
  reviews: any[] = [];
  userName = '';
  profileUrl = '';

  constructor(private supabase: Supabase, private router: Router) {
    this.supabase.session$.subscribe(async (session) => {
      const user = session?.user;
      if (user) {
        this.userName = user.email || 'Usuário';
        this.profileUrl = 'assets/images/profile.png';
        this.reviews = await this.supabase.getUserReviews(user.id);
      }
    });
  }

  async removeReview(reviewId: string) {
    try {
      await this.supabase.deleteReview(reviewId);
      this.reviews = this.reviews.filter((r) => r.id !== reviewId);
    } catch (e) {
      console.error('Erro ao remover review:', e);
    }
  }
  goToDetails(apiId: string) {
    this.router.navigate(['/details', apiId]);
  }

  get profile(): string {
    return 'assets/images/profile.png';
  }
}
