import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../common/Services/AuthService';
import { Map } from "../../components/Map/Map";
import { PropertiesService } from '../../common/Services/PropertiesService';
import { PropertyCard } from '../../components/PropertyCard/PropertyCard';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home-page',
  imports: [Map, PropertyCard, RouterLink],
  templateUrl: './HomePage.html',
  styleUrl: './HomePage.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit{
  ngOnInit(): void {

    this.getProperties();
  }

  private readonly service = inject(PropertiesService);

  properties = signal<Properties[]>([]);

  getProperties(){
    this.service.getProperties("FOR_SALE", 1, 3, '').subscribe((res)=>{
      this.properties.set(res.results)
    });
  }


}
