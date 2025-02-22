import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SelectorPageComponent } from './pages/selector-page/selector-page.component';

const routes: Routes = [
	// { path: 'selector', component: SelectorPageComponent }, - Salma
	{
		path: '',
		children: [
			{ path: 'selector', component: SelectorPageComponent },
			{ path: '**', redirectTo: 'selector' }
		]
	},
	// {
	// 	path: '**',
	// 	redirectTo: 'selector'
	// } - Salma
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CountriesRoutingModule {}
