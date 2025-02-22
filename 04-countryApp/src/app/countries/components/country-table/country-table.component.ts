import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-table',
  templateUrl: './country-table.component.html',
  styles: [
    `img {
      width: 25px;
    }

    tr th, tr td {
      text-align: center;
    }
    `
  ]
})
export class CountryTableComponent {
  @Input() public countries: Country[] = [];
}
