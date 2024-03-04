import { AbstractControl, ValidationErrors } from "@angular/forms";

export class noSpace {
    static noSpaceValidator(control: AbstractControl): ValidationErrors | null {
        if (!control.value) {
            return null;
        }
        let controlValue = control.value as string;
        if ((controlValue.length !== controlValue.trim().length) || (controlValue.indexOf(' ') >= 0)) {
            return { noSpaceValidator: true };
        } else {
            return null;
        }
    }
}