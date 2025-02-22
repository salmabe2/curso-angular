import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LazyImageComponent } from './components/lazy-image/lazy-image.component';

const exports = [SidebarComponent, LazyImageComponent];

@NgModule({
	declarations: [...exports],
	imports: [CommonModule],
	exports: [...exports]
})
export class SharedModule {}
