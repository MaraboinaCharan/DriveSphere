import { AbstractControl } from "@angular/forms";

export function PasswordValidator(control:AbstractControl):{[key:string]:any}|null {

const confirmPassword=control.get('confirmPassword');
const password=control.get('password')
const passwordvalue=password?.value;
if(password?.pristine||confirmPassword?.pristine&&(passwordvalue.test("^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$")))
 {
    
    return null;
}
return password&&confirmPassword&&password.value!=confirmPassword.value?{'misMatch':true}:null;

}