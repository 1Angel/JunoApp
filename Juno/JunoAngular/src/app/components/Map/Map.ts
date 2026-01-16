import { AfterViewInit, ChangeDetectionStrategy, Component, input, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './Map.html',
  styleUrl: './Map.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Map implements AfterViewInit {
  ngAfterViewInit(): void {
    this.initMap();
  }
  private map!: L.Map;

  latitude = input.required<number>();
  longitude = input.required<number>();
  mapZoom = input.required<number>();
  price = input.required<number>();


  private initMap(): void {
    this.map = L.map('map', {
      center: [this.latitude(), this.longitude()],
      zoom: this.mapZoom()
    });

    var houseIcon = L.icon({
      iconUrl: 'marker-icon.png',
      shadowUrl: 'marker-shadow.png',
      iconSize: [18, 28],
      shadowSize: [24, 24],
      iconAnchor: [9, 28],
      shadowAnchor: [9, 24],
      popupAnchor: [0, -24]

    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    L.marker([this.latitude(), this.longitude()], { icon: houseIcon }).addTo(this.map)
      .bindPopup(`${this.price()}`)
      .openPopup();
  }

}
