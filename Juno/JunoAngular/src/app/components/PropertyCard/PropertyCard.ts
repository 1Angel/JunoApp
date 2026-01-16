import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BathIcon, BedIcon, HeartIcon, LucideAngularModule, MapPinIcon, PinIcon, RulerIcon } from "lucide-angular";
import { Carousel } from "../Carousel/Carousel";

@Component({
  selector: 'app-property-card',
  imports: [LucideAngularModule, CurrencyPipe, RouterLink, NgOptimizedImage, Carousel],
  templateUrl: './PropertyCard.html',
  styleUrl: './PropertyCard.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropertyCard {

  property = input.required<Properties>();

  bookmark = output<number>();

  setBookmark(id: number){
    this.bookmark.emit(id);
  }

  readonly heartIcon = HeartIcon;
  readonly bedIcon = BedIcon;
  readonly bathIcon = BathIcon;
  readonly pinIcon = MapPinIcon;
  readonly rulerIcon = RulerIcon;

}
