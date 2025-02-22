import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		SharedModule
		//HttpClientModule - deprecated, use provideHttpClient instead
	],
	providers: [provideHttpClient()],
	bootstrap: [AppComponent]
})
export class AppModule {}
