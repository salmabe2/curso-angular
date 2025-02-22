import { Injectable } from '@angular/core';
import {
	CanMatch,
	GuardResult,
	MaybeAsync,
	Route,
	Router,
	UrlSegment
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PublicGuard implements CanMatch {
	constructor(private authService: AuthService, private router: Router) {}

	private checkAuthStatus(): MaybeAsync<GuardResult> {
		return this.authService.checkAuthentication().pipe(
			tap((isAuthenticated) => {
				if (isAuthenticated) this.router.navigate(['./']);
			}),
			map((isAuthenticated) => !isAuthenticated)
		);
	}

	canMatch(route: Route, segments: UrlSegment[]): MaybeAsync<GuardResult> {
		return this.checkAuthStatus();
	}
}
