import { Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

interface MarkerAndColor {
	color: string;
	marker: Marker;
}

interface PlainMarker {
	color: string;
	lngLat: [number, number];
}

@Component({
	templateUrl: './markers-page.component.html',
	styleUrl: './markers-page.component.css',
})
export class MarkersPageComponent {
	@ViewChild('map') divMap?: ElementRef;

	public map?: Map;
	public currentLngLat: LngLat = new LngLat(-74.08, 4.63);
	public markers: MarkerAndColor[] = [];

	ngAfterViewInit(): void {
		if (!this.divMap) throw 'El elemento HTML no fue encontrado';

		this.map = new Map({
			container: this.divMap?.nativeElement, // container ID
			style: 'mapbox://styles/mapbox/streets-v12', // style URL
			center: this.currentLngLat, // starting position [lng, lat]
			zoom: 13, // starting zoom
		});

		// const markerHtml = document.createElement('div');
		// markerHtml.innerHTML = 'Fernando Herrera'; // Nuestros markers propios, este es solamente texto, sin pin

		// const marker = new Marker({
		//   color: 'red',
		//   element: markerHtml
		// }).setLngLat(this.currentLngLat).addTo(this.map);

		this.readFromLocalStorage();
	}

	createMarker(): void {
		if (!this.map) return;

		const color = '#xxxxxx'.replace(/x/g, (y) =>
			((Math.random() * 16) | 0).toString(16),
		);
		const lngLat = this.map?.getCenter();

		this.addMarker(lngLat, color);
	}

	addMarker(lngLat: LngLat, color: string): void {
		if (!this.map) return;

		const marker = new Marker({
			color, // color: color
			draggable: true,
		})
			.setLngLat(lngLat)
			.addTo(this.map);

		this.markers.push({
			color, //color: color
			marker, //marker: marker
		});
		this.saveToLocalStorage();

		marker.on('dragend', () => {
      this.saveToLocalStorage();
		});
	}

	deleteMarker(index: number): void {
		this.markers[index].marker.remove();
		this.markers.splice(index, 1);
	}

	flyTo(marker: Marker): void {
		this.map?.flyTo({
			zoom: 14,
			center: marker.getLngLat(),
		});
	}

	saveToLocalStorage(): void {
		const plainMarkers: PlainMarker[] = this.markers.map(
			({ color, marker }) => {
				return {
					color,
					lngLat: marker.getLngLat().toArray(),
				};
			},
		);
		localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers));
	}

	readFromLocalStorage(): void {
		const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
		const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersString); // !OJO!, confiamos en lo que ts está haciendo y que efectivamente es de tipo PlainMarker[]

		plainMarkers.forEach(({ color, lngLat }) => {
			const [lng, lat] = lngLat;
			const coords = new LngLat(lng, lat);

			this.addMarker(coords, color);
		});
	}
}
