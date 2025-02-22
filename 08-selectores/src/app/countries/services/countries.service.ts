import { inject, Injectable } from '@angular/core';
import { Country, Region, SmallCountry } from '../interfaces/country.interface';
import { combineLatest, map, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class CountriesService {
	private http: HttpClient = inject(HttpClient);
	private baseUrl: string = 'https://restcountries.com/v3.1';

	// NOTE: Propiedad privada que no queremos que se modifique desde fuera
	private _regions: Region[] = [
		Region.Africa,
		Region.Americas,
		Region.Asia,
		Region.Europe,
		Region.Oceania
	];

	constructor() {}

	get regions(): Region[] {
		// NOTE: No modifica la propiedad original, rompe la referencia (o deep clone)
		return [...this._regions];
	}

	getCountriesByRegion(region: Region): Observable<SmallCountry[]> {
		if (!region) return of([]);
		const url: string = `${this.baseUrl}/region/${region}?fields=cca3,name,borders`;

		return this.http.get<Country[]>(url).pipe(
			map((countries) =>
				countries.map((country) => ({
					name: country.name.common,
					cca3: country.cca3,
					borders: country.borders ?? [] // NOTE: Prevents from returning '' as valid, more secure than ||
				}))
			),
			tap((response) => console.log({ response }))
		);
	}

	getCountryByAlphaCode(alphaCode: string): Observable<SmallCountry> {
		const url = `${this.baseUrl}/alpha/${alphaCode}?fields=cca3,name,borders`;
		return this.http.get<Country>(url).pipe(
			map((country) => ({
				name: country.name.common,
				cca3: country.cca3,
				borders: country.borders ?? []
			}))
		);
	}

	getCountryBordersByCodes(borders: string[]): Observable<SmallCountry[]> {
		if (!borders || borders.length === 0) return of([]);

		const countriesRequest: Observable<SmallCountry>[] = [];

		borders.forEach((code) => {
			const request = this.getCountryByAlphaCode(code);
			countriesRequest.push(request);
		});

		return combineLatest(countriesRequest);
	}
}
