import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//import { MenuComponent } from './components/menu/menu.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { MenubarComponent } from './components/menubar/menubar.component';

const exports = [
	//MenuComponent,
	MenubarComponent
];

@NgModule({
	declarations: [...exports],
	imports: [CommonModule, PrimeNgModule],
	exports: [...exports]
})
export class SharedModule {}
