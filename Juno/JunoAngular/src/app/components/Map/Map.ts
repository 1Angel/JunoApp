import { AfterViewInit, ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import * as L from 'leaflet';

const houseIcon = L.icon({
  iconUrl: 'marker-icon.png',
  shadowUrl: 'marker-shadow.png',
  iconSize: [18, 28],
  shadowSize: [24, 24],
  iconAnchor: [9, 28],
  shadowAnchor: [9, 24],
  popupAnchor: [0, -24],
});

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
      this.initMarker();
    }
    private map!: L.Map;
    private marker!: L.Marker;

    latitude = input.required<number>();
    longitude = input.required<number>();
    mapZoom = input.required<number>();
    isDraggable = input<boolean>();
    price = input<number>();

    emitLocation = output<L.LatLng>();

    private initMap(): void {
      this.map = L.map('map', {
        center: [this.latitude(), this.longitude()],
        zoom: this.mapZoom(),
      });

      const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        minZoom: 3,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      });

      tiles.addTo(this.map);

      // L.marker([this.latitude(), this.longitude()], { icon: houseIcon }).addTo(this.map)
      //   .bindPopup(`${this.price()}`)
      //   .openPopup();
    }

    initMarker() {
      this.marker = L.marker([this.latitude(), this.longitude()], {
        draggable: this.isDraggable(),
        icon: houseIcon,
      })
        .addTo(this.map)
        .bindPopup(`Hola nena`)
        .openPopup();

      this.marker.on('dragend', (e) => {
        console.log(e.target.getLatLng());
        this.emitLocation.emit(e.target.getLatLng());
      });
    }
}
