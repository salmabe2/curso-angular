import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { RouterModule } from '@angular/router';

const exports = [SideMenuComponent];

@NgModule({
	declarations: [...exports],
	imports: [CommonModule, RouterModule],
	exports: [...exports]
})
export class SharedModule {}
