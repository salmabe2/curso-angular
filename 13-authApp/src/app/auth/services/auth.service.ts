import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from './../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';

import {
	AuthStatus,
	CheckTokenResponse,
	LoginResponse,
	User,
} from '../interfaces';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private readonly baseUrl: string = environment.baseUrl;
	private http = inject(HttpClient);

	private _currentUser = signal<User | null>(null); // * NOTE: Para que nadie lo modifique fuera del servicio
	private _authStatus = signal<AuthStatus>(AuthStatus.checking);

	//! Al mundo exterior
	public currentUser = computed(() => this._currentUser());
	public authStatus = computed(() => this._authStatus());

	constructor() {
		// *NOTE: Para verificar cuando se inicia la app
		this.checkAuthStatus().subscribe();
	}

	private setAuthentication(user: User, token: string): boolean {
		this._currentUser.set(user);
		this._authStatus.set(AuthStatus.authenticated);
		localStorage.setItem('token', token);

		return true;
	}

	login(email: string, password: string): Observable<boolean> {
		const url = `${this.baseUrl}/auth/login`;
		const body = { email, password };

		return this.http.post<LoginResponse>(url, body).pipe(
			map(({ user, token }) => this.setAuthentication(user, token)),
			// TODO: Errores
			catchError((err) => throwError(() => err.error.message)),
		);
	}

	checkAuthStatus(): Observable<boolean> {
		const url = `${this.baseUrl}/auth/check-token`;
		const token = localStorage.getItem('token');

    if (!token) {
      this.logout(); // *NOTE: Make sure status is updated when not having a token
			return of(false);
		}

		const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

		return this.http.get<CheckTokenResponse>(url, { headers }).pipe(
			map(({ user, token }) => this.setAuthentication(user, token)),
			catchError(() => {
				this._authStatus.set(AuthStatus.notAuthenticated);
				return of(false);
			}),
		);
	}

	logout(): void {
		localStorage.removeItem('token');
		this._currentUser.set(null);
		this._authStatus.set(AuthStatus.notAuthenticated);

		// *NOTE: El effect en app.component se encarga de redirigir
	}
}
