import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-not-found-page',
  imports: [RouterLink],
  templateUrl: './NotFoundPage.html',
  styleUrl: './NotFoundPage.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPage { }
