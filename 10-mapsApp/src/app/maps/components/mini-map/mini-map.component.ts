import {
	AfterViewInit,
	Component,
	ElementRef,
	Input,
	ViewChild,
} from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

@Component({
	selector: 'map-mini-map',
	templateUrl: './mini-map.component.html',
	styleUrl: './mini-map.component.css',
})
export class MiniMapComponent implements AfterViewInit {
	@Input() public lngLat?: [number, number];

	@ViewChild('map') divMap?: ElementRef;

	public map?: Map;

	ngAfterViewInit(): void {
		this.initializeMap();
	}

	initializeMap() {
		if (!this.divMap?.nativeElement) throw 'Map div not found';
		if (!this.lngLat) throw "LngLat can't be null";

		this.map = new Map({
			container: this.divMap?.nativeElement, // container ID
			style: 'mapbox://styles/mapbox/streets-v12', // style URL
			center: this.lngLat, // starting position [lng, lat]
			zoom: 15, // starting zoom
			interactive: false,
		});

		const color = '#xxxxxx'.replace(/x/g, (y) =>
			((Math.random() * 16) | 0).toString(16),
		);
		const marker = new Marker({
			color, // color: color
			draggable: true,
		})
			.setLngLat(this.lngLat)
			.addTo(this.map);
	}
}
