import { ChangeDetectionStrategy, Component, effect, inject, output, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-status-filter',
  imports: [FormField],
  templateUrl: './HomeStatusFilter.html',
  styleUrl: './HomeStatusFilter.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeStatusFilter {
    router  = inject(Router);

  types = [
    {
      title: "FOR RENT",
      value: "FOR_RENT"
    },
    {
      title: "FOR SALE",
      value: "FOR_SALE"
    }
  ];

  selectType = signal<"FOR_RENT" |"FOR_SALE">('FOR_SALE');

  myform = form(this.selectType);

  homeStatus = output<string>();

  setStatusParam(status: string){
    this.homeStatus.emit(status);
  }


 }
