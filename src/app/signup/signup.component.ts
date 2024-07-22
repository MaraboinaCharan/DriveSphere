import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService} from '../Services/service.service';
import { PasswordValidator } from '../validators/password.validator';
import { forbiddenNameValidator } from '../validators/username.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private service: ServiceService, private fb: FormBuilder) {}

  registrationForm!: FormGroup;
  public showPassword: boolean = false;
  public showPassword2: boolean = false;
  cond: boolean = false;

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/FirstName|admin|username|Password|PASSWORD|Admin|ADMIN|Username|USERNAME|UserName|Name|name/)]],
      lastName: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/lastname|admin|username|Admin|ADMIN|Username|USERNAME|UserName|Name|name/)]],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      subscribe: [false],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      address: this.fb.group({
        city: ['', Validators.required],
        state: ['', Validators.required],
        postalCode: ['', [Validators.required, Validators.minLength(6)]]
      })
    }, { validator: PasswordValidator });

    this.registrationForm.get('subscribe')?.valueChanges.subscribe(checkedvalue => {
      const email = this.registrationForm.get('email');
      if (checkedvalue) {
        email?.setValidators(Validators.required);
      } else {
        email?.clearValidators();
      }
      email?.updateValueAndValidity();
    });
  }

  register(): void {
    const passwordvalue = this.registrationForm.get('password')?.value;
    const firstnamevalue = this.registrationForm.get('firstName')?.value;
    const lastnamevalue = this.registrationForm.get('lastName')?.value;
    const email = this.registrationForm.get('email')?.value;
    const phoneNumber = this.registrationForm.get('phoneNumber')?.value;
    if (passwordvalue && firstnamevalue && email && phoneNumber && lastnamevalue) {
      console.log("valid")
      const userData = {
        "username": firstnamevalue + " "+lastnamevalue,
        "password": passwordvalue
      };
      console.log(userData);

      this.service.register(userData).subscribe(
        (response) => {
          this.cond = true;
          console.log('Registration successful:', response);
          this.registrationForm.reset();
        },
      );
    } else {
      console.log("Enter all details")
      this.cond = false;
      if (this.registrationForm.invalid) {
        this.markFormGroupTouched(this.registrationForm);
      }
    }
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  togglePasswordVisibility2(): void {
    this.showPassword2 = !this.showPassword2;
  }

  get firstName() {
    return this.registrationForm.get('firstName');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get phoneNumber() {
    return this.registrationForm.get('phoneNumber');
  }

  get isPasswordInvalid() {
    const passwordControl = this.registrationForm.get('password');
    var pvalue = " ";
    pvalue = passwordControl?.value;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return (passwordControl?.touched) && (!passwordRegex.test(pvalue));
  }

  get lastName() {
    return this.registrationForm.get('lastName');
  }

  get validEmail() {
    const email = this.registrationForm.get('email');
    const emailvalue = email?.value;
    const regex = /^\S+@\S+\.\S+$/;
    return (email?.touched) && (!regex.test(emailvalue));
  }

  get phoneNumberValid() {
    const phoneNumber = this.registrationForm.get('phoneNumber');
    const phoneNumberValue = phoneNumber?.value;
    const regex = /^[6-9][0-9]{9}$/;
    return (phoneNumber?.touched) && (!regex.test(phoneNumberValue));
  }
}
