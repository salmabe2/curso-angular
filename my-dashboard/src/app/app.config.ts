import {
	ApplicationConfig,
	provideZoneChangeDetection
} from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(
			routes,
			withViewTransitions({
				skipInitialTransition: true
				// onViewTransitionCreated(transitionInfo) {
				// 	console.log({ transitionInfo });
				// }
			})
		),
		// importProvidersFrom(HttpClientModule)
    provideHttpClient(withInterceptorsFromDi())
	]
};
