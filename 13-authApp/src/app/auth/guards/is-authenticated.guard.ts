import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { AuthStatus } from '../interfaces';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
	// * NOTE: si queremos guardar a que url redirigir al usuario una vez se autentique para mandarle directamente a la url solicitada

	const authService = inject(AuthService);
	const router = inject(Router); // * NOTE: Angular ya lo ha cargado, por lo que por mejorar la legibilidad del código, se pude colocar arriba aunque se use después del primer return

	if (authService.authStatus() === AuthStatus.authenticated) return true;
	if (authService.authStatus() === AuthStatus.checking) return false;

	// const url = state.url;
	// localStorage.setItem('url', url);
	router.navigateByUrl('/auth/login');

	return false;
};
