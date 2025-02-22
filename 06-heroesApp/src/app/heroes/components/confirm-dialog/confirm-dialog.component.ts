import { Component, inject, model } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Hero } from '../../interfaces/hero.interface';

@Component({
	selector: 'app-confirm-dialog',
	templateUrl: './confirm-dialog.component.html',
	styles: ``
})
export class ConfirmDialogComponent {
	readonly dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);
	readonly data = inject<Hero>(MAT_DIALOG_DATA);
  // readonly animal = model(this.data.animal);

  // constructor() {
  //   console.log(this.data);
  // }

	onNoClick(): void {
		this.dialogRef.close(false);
	}

	onConfirm(): void {
		this.dialogRef.close(true);
	}
}
