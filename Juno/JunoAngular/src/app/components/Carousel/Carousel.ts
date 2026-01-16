import { ChangeDetectionStrategy, Component, computed, effect, input, signal } from '@angular/core';

@Component({
  selector: 'app-carousel',
  imports: [],
  templateUrl: './Carousel.html',
  styleUrl: './Carousel.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Carousel {

  index = signal(0);
  images = input.required<Image[]>();

  imagesLength = computed(()=> this.images().length);

  nextSlide() {
    this.index.update((x) => x === this.imagesLength() - 1 ? 0 : x+=1);
  }

  prevSlide() {
    this.index.update((x) => x === 0 ? this.imagesLength() - 1 : x -= 1);
  }

}
