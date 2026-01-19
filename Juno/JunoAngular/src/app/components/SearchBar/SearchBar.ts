import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-search-bar',
  imports: [FormField],
  templateUrl: './SearchBar.html',
  styleUrl: './SearchBar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBar {
  selectType = signal<"FOR_RENT" | "FOR_SALE">('FOR_SALE');
  
  direction = output<string>();
  homeStatus = output<string>();
  
  //refactor this
  myForm = form(signal<string>(''));
  selectForm = form(this.selectType);
  setStatusParam(status: string) {
    this.homeStatus.emit(this.selectType());
  }

  setDirection() {
    this.direction.emit(this.myForm().value());
  }

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
}
