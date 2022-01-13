import { FieldValidation } from './field-validation.interface';
import { InputType } from '../../../modules/form-elements/types/input-type.type';

export interface RegistrationField {
  type: InputType;
  name: string;
  label: string;
  required: boolean;
  validations?: FieldValidation[];
}
