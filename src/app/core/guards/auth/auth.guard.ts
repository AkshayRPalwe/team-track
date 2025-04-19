import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(): boolean | UrlTree {
    if (isPlatformBrowser(this.platformId)) {
      const isLoggedIn = !!localStorage.getItem('token');
      return isLoggedIn ? true : this.router.parseUrl('/login');
    }

    // fallback for SSR - treat as unauthenticated or allow (based on your strategy)
    return this.router.parseUrl('/login'); // or `return true` if you want SSR to pass
  }
}
