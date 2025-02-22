import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	CanMatch,
	GuardResult,
	MaybeAsync,
	Route,
	RouterStateSnapshot,
	UrlSegment
} from '@angular/router';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanMatch, CanActivate {
	constructor(private authService: AuthService, private router: Router) {}

	private checkAuthStatus(): MaybeAsync<GuardResult> {
		return this.authService.checkAuthentication().pipe(
			tap((isAuthenticated) => {
				if (!isAuthenticated) this.router.navigate(['./auth/login']);
			})
		);
	}

	canMatch(route: Route, segments: UrlSegment[]): MaybeAsync<GuardResult> {
		// console.log('CanMatch');
		// console.log({ route, segments });

		return this.checkAuthStatus();
	}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): MaybeAsync<GuardResult> {
		// console.log('CanActivate');
		// console.log({ route, state });

		return this.checkAuthStatus();
	}
}
