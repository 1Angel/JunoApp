import { ChangeDetectionStrategy, Component, ElementRef, viewChild } from '@angular/core';

@Component({
  selector: 'app-about-page',
  imports: [],
  templateUrl: './AboutPage.html',
  styleUrl: './AboutPage.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPage {

  saludoDialog = viewChild<ElementRef<HTMLDialogElement>>('saludo');

  showDialog(){
    this.saludoDialog()?.nativeElement.showModal();
  }

  closeDialog(){
    this.saludoDialog()?.nativeElement.close();
  }
 }
