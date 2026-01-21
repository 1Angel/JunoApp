import { ChangeDetectionStrategy, Component, input, InputSignal, InputSignalWithTransform, model } from "@angular/core";
import { FormValueControl } from "@angular/forms/signals";
import type { ValidationError, DisabledReason, WithOptionalField } from "@angular/forms/signals";

export type InputType = | "text" | "email" | "password" | "tel";

@Component({
  selector: 'app-custom-input',
  imports: [],
  templateUrl: './CustomInput.html',
  styleUrl: './CustomInput.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomInput implements FormValueControl<string>{
  readonly value = model('');

  placeholder = input<string>('');
  type = model<InputType>();

  readonly disabled = input<boolean>(false);
  readonly touched = model<boolean>(false);
  readonly invalid = input<boolean>(false);
  readonly hidden = input<boolean>(false);
  readonly readonly = input<boolean>(false);
  readonly disabledReasons = input<readonly WithOptionalField<DisabledReason>[]>([]);
  readonly errors = input<readonly WithOptionalField<ValidationError>[]>([])

  minLength = input<number | undefined>(undefined);
  maxLength = input<number | undefined>(undefined);
  required = input<boolean>(false);
  
  //add errors
}
