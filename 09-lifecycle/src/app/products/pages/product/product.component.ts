import {
	AfterContentChecked,
	AfterContentInit,
	AfterViewChecked,
	AfterViewInit,
	Component,
	DoCheck,
	OnChanges,
	OnDestroy,
	OnInit,
	SimpleChanges
} from '@angular/core';

@Component({
	selector: 'products-page-product',
	templateUrl: './product.component.html',
	styleUrl: './product.component.css'
})
export class ProductComponent
	implements
		OnInit,
		OnChanges,
		DoCheck,
		AfterContentInit,
		AfterContentChecked,
		AfterViewInit,
		AfterViewChecked,
		OnDestroy
{

  public isProductVisible: boolean = false;
  public currentPrice: number = 10;

  constructor() {
    // Para inicializaciones, pero no peticiones https
		console.log('Constructor');
	}

  ngOnInit(): void {
    // Peticiones, websockets, timers
		console.log('ngOnInit');
	}

  ngOnChanges(changes: SimpleChanges): void {
    // Detecta cambios en @Input, no en propiedades propias
    // Para estar pendientes de los cambios de los inputs, si el input tiene cierto valor y queremos implementar un código
		console.log({ changes });
		console.log('ngOnChanges');
  }

  // Los siguientes se utilizan más cuando usamos plugins o paquetes específicos, raramente se usan

	ngDoCheck(): void {
		console.log('ngDoCheck');
	}

	ngAfterContentInit(): void {
		console.log('ngAfterContentInit');
	}

	ngAfterContentChecked(): void {
		console.log('ngAfterContentChecked');
	}

  ngAfterViewInit(): void {
    // Por ejemplo, propiedad que cambie algún div, se puede determinar el ancho
		console.log('ngAfterViewInit');
	}

	ngAfterViewChecked(): void {
		console.log('ngAfterViewChecked');
	}

  ngOnDestroy(): void {
    // Para limpiar código, mejora la memoria y agiliza la app
		console.log('ngOnDestroy');
  }

  increasePrice() {
    this.currentPrice++;
  }
}
