import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { AuthService } from '../../common/Services/AuthService';
import { Map } from '../../components/Map/Map';
import { PropertiesService } from '../../common/Services/PropertiesService';
import { PropertyCard } from '../../components/PropertyCard/PropertyCard';
import { RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-page',
  imports: [Map, PropertyCard, RouterLink],
  templateUrl: './HomePage.html',
  styleUrl: './HomePage.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit {
  ngOnInit(): void {
    this.getProperties();
    this.setMetadata();
  }

  private readonly service = inject(PropertiesService);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  properties = signal<Properties[]>([]);

  getProperties() {
    this.service.getProperties('FOR_SALE', 1, 3, '').subscribe((res) => {
      this.properties.set(res.results);
    });
  }

  setMetadata() {
    this.title.setTitle('Welcome to Juno, the marketplaces for homes! - Juno');
    this.meta.addTag({ name: 'title', content: 'Welcome to Juno, the marketplaces for homes! - Juno' });
    this.meta.addTag({ name: 'og:title', content: 'Welcome to Juno, the marketplaces for homes! - Juno' });
    this.meta.addTag({ name: 'description', content: 'Juno is the perfect place to find your next home!' });
    this.meta.addTag({ name: 'og:description', content: 'Juno is the perfect place to find your next home!' });
  }
}
