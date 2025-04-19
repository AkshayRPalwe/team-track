import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(): boolean | UrlTree {
    if (isPlatformBrowser(this.platformId)) {
      const isLoggedIn = !!localStorage.getItem('token');
      return isLoggedIn ? this.router.parseUrl('/employee') : true;
    }

    return true; // allow during SSR (or adjust if needed)
  }
}
