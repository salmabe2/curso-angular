import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { User } from '../interfaces/user';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private baseUrl = environments.baseUrl;
	private user?: User;

	constructor(private http: HttpClient) {}

	get currentUser(): User | undefined {
		if (!this.user) return undefined;
		// NOTE: Para no devolver la referencia exacta de nuestra propiedad
		return structuredClone(this.user);
	}

	login(email: string, password: string): Observable<User> {
		// http.post('login', {email, password}) -> en un auth real
		return this.http.get<User>(`${this.baseUrl}/users/1`).pipe(
			tap((user) => (this.user = user)),
			tap((user) => localStorage.setItem('token', 'aASDsdSd123lk4lk11lk'))
		);
	}

	checkAuthentication(): Observable<boolean> {
    if (!localStorage.getItem('token')) return of(false);

    const token = localStorage.getItem('token'); // Revisar si token es válido con back

		return this.http.get<User>(`${this.baseUrl}/users/1`).pipe(
			tap((user) => (this.user = user)),
			map((user) => !!user), // NOTE: con !! transforma un undefined a un boolean
			catchError((err) => of(false))
		);
	}

	logout() {
		this.user = undefined;
		localStorage.clear();
	}
}
