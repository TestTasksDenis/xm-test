import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { FieldValidation } from '../../types/field-validation.interface';

@Pipe({
  name: 'errorMessage',
})
export class ErrorMessagePipe implements PipeTransform {
  transform(fieldValidations?: FieldValidation[], controlErrors?: ValidationErrors | null): string | null {
    if (fieldValidations && controlErrors) {
      const firstErrorName = Object.keys(controlErrors ?? {})[0];
      const errorDetails = controlErrors[firstErrorName];

      return this.getErrorMessage(firstErrorName, errorDetails, fieldValidations);
    }

    return null;
  }

  private getErrorMessage(errorName: string, errorDetails: any, fieldValidations?: FieldValidation[]): string | null {
    const lengthChecking = () => {
      const validationDetails = fieldValidations?.find(item => {
        return item.name === errorName && errorDetails.requiredLength === +item.value;
      });

      return validationDetails?.message ?? '';
    };

    switch (errorName) {
      case 'required': {
        return 'This is Required field';
      }
      case 'minlength': {
        return lengthChecking();
      }
      case 'maxlength': {
        return lengthChecking();
      }
      case 'pattern': {
        const validationDetails = fieldValidations?.find(item => {
          return item.name === errorName && errorDetails.requiredPattern === item.value;
        });

        return validationDetails?.message ?? '';
      }
    }

    return null;
  }
}
