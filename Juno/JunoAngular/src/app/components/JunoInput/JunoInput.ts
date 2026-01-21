import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import type { ValidationError, DisabledReason } from '@angular/forms/signals';

export type InputType = "text" | "tel" | "email" | "number" | "password";  

@Component({
  selector: 'app-juno-input',
  imports: [],
  templateUrl: './JunoInput.html',
  styleUrl: './JunoInput.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JunoInput implements FormValueControl<string>{

  value = model<string>('');

  inputType = input<InputType>();
  placeHolder = input<string>();

  disabled = input<boolean>(false);
  errors = input<readonly ValidationError[]>([]);
  touched = input<boolean>(false);


}
