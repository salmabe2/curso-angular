import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomLabelDirective } from './custom-label.directive';

const exports = [
  CustomLabelDirective
]

@NgModule({
  declarations: [
    ...exports,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...exports
  ]
})
export class SharedModule { }
