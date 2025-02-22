import { Component, effect, input, Input, output, Output } from '@angular/core';
import { Product } from '@interfaces/product.interface';

@Component({
	selector: 'app-product-card',
	standalone: true,
	imports: [],
	templateUrl: './product-card.component.html',
	styles: ``,
})
export class ProductCardComponent {
	// @Input({
	//   required: true
	// })
	// public product!: Product;

	public product = input.required<Product>();

	// @Output() public onIncrementQuantity = new EventEmitter<number>();
	public onIncrementQuantity = output<number>();

	public incrementQuantity(): void {
		this.onIncrementQuantity.emit(this.product().quantity + 1);
  }

  public loginEffect = effect(() => {
    console.log(this.product());
  })
}
