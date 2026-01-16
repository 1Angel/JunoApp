import { ChangeDetectionStrategy, Component, effect, signal } from '@angular/core';
import { form, required, FormField } from '@angular/forms/signals';


@Component({
  selector: 'app-register-page',
  imports: [FormField],
  templateUrl: './RegisterPage.html',
  styleUrl: './RegisterPage.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPage { 



}
