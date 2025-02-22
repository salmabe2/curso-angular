import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MainPageComponent } from './pages/main-page.component';
import { ListComponent } from './components/list/list.component';
import { AddCharacterComponent } from './components/add-character/add-character.component';

const exports = [MainPageComponent];

@NgModule({
	declarations: [...exports, ListComponent, AddCharacterComponent],
	imports: [CommonModule, FormsModule],
	exports: [...exports]
})
export class DbzModule {}
