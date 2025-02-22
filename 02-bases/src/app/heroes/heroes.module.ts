import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroComponent } from './hero/hero.component';
import { ListComponent } from './list/list.component';

const exports = [HeroComponent, ListComponent];

@NgModule({
	declarations: [...exports],
	imports: [CommonModule],
	exports: [...exports]
})
export class HeroesModule {}
