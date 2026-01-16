import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-about-page',
  imports: [],
  templateUrl: './AboutPage.html',
  styleUrl: './AboutPage.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPage { }
