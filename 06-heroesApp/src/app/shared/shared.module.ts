import { NgModule } from '@angular/core';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';

const exports = [Error404PageComponent];

@NgModule({
	declarations: [...exports],
	imports: [],
	exports: [...exports]
})
export class SharedModule {}
