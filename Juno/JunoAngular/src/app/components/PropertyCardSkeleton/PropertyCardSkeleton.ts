import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-property-card-skeleton',
  imports: [],
  templateUrl: './PropertyCardSkeleton.html',
  styleUrl: './PropertyCardSkeleton.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropertyCardSkeleton { }
