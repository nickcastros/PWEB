import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Supabase } from '../supabase';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  userName: string | null = null;
  avatarUrl: string | null = null;
  showMenu = false;
  private sessionSub?: Subscription;

  constructor(private supabase: Supabase, private router: Router) {}

  ngOnInit() {
    this.sessionSub = this.supabase.session$.subscribe(async (session) => {
      const user = session?.user;
      if (user) {
        const { data } = await this.supabase.profile(user);
        this.userName = data?.full_name || user.email || 'Usuário';
        this.avatarUrl = data?.avatar_url
          ? data.avatar_url
          : 'assets/images/profile.png';
      } else {
        this.userName = null;
        this.avatarUrl = null;
      }
    });
  }

  ngOnDestroy() {
    this.sessionSub?.unsubscribe();
  }
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  async logout(event: Event) {
    event.stopPropagation();
    await this.supabase.signOut();
    this.showMenu = false;
    this.userName = null;
    this.avatarUrl = null;
    this.router.navigate(['/auth']);
  }

  // Fecha o menu ao clicar fora
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-info')) {
      this.showMenu = false;
    }
  }
}
