import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Supabase } from './supabase';

export const authGuard: CanActivateFn = async () => {
  const supabase = inject(Supabase);
  const router = inject(Router);
  const session = await supabase.getSession();
  if (!session || !session.user) {
    router.navigate(['/auth']);
    return false;
  }
  return true;
};
