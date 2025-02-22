import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, switchMap, tap } from 'rxjs';

import { CountriesService } from '../../services/countries.service';
import { Region, SmallCountry } from '../../interfaces/country.interface';

@Component({
	selector: 'app-selector-page',
	templateUrl: './selector-page.component.html',
	styles: ``
})
export class SelectorPageComponent implements OnInit {
	private fb: FormBuilder = inject(FormBuilder);
	private countriesService: CountriesService = inject(CountriesService);

	public countriesByRegion: SmallCountry[] = [];
	public borders: SmallCountry[] = [];

	public myForm: FormGroup = this.fb.group({
		region: ['', Validators.required],
		country: ['', Validators.required],
		border: ['', Validators.required]
	});

	ngOnInit(): void {
		this.onRegionChanged();
		this.onCountryChanged();
	}

	get regions(): Region[] {
		return this.countriesService.regions;
	}

	onRegionChanged(): void {
		this.myForm
			.get('region')!
			.valueChanges.pipe(
				tap(() => this.myForm.get('country')!.setValue('')),
				tap(() => (this.borders = [])),
				// NOTE: Para recibir el valor de un observable y suscribirme a otro observable a partir del previo
				switchMap((region) =>
					this.countriesService.getCountriesByRegion(region)
				)
				// NOTE: Same thing simplified - NO ES SOPORTADO EN TYPESCRIPT
				// switchMap(this.countriesService.getCountriesByRegion)
			)
			.subscribe((countries) => {
				this.countriesByRegion = countries;
			});
	}

	onCountryChanged() {
		this.myForm
			.get('country')!
			.valueChanges.pipe(
				tap(() => this.myForm.get('border')!.setValue('')),
				filter((value: string) => value.length > 0),
				switchMap((alphaCode) =>
					this.countriesService.getCountryByAlphaCode(alphaCode)
        ),
        switchMap(country => this.countriesService.getCountryBordersByCodes(country.borders))
			)
			.subscribe((countries) => {
				this.borders = countries;
			});
	}
}
