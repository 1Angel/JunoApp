import { ChangeDetectionStrategy, Component, computed, input, OnChanges, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';

type MarkerType = {
  id: number;
  lat: number;
  long: number;
  title: number;
  icon: string;
}

@Component({
  selector: 'app-map-marker',
  imports: [],
  templateUrl: './MapMarker.html',
  styleUrl: './MapMarker.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapMarker implements OnChanges{
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

  marker = L.marker;

  map = input<L.Map>();


}
