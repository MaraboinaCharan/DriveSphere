import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../Services/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public showPassword = false;
  userName = true;
  password = true;

  constructor(private router: Router, private service: ServiceService, private fb: FormBuilder) {}

  loginPage!: FormGroup;

  get name() {
    return this.loginPage.get('userName');
  }
  
  get pass() {
    return this.loginPage.get('password');
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  
  ngOnInit(): void {
    localStorage.clear();
    this.loginPage = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login(): void {
    const submitName = this.loginPage.get('userName')?.value;
    const submitPass = this.loginPage.get('password')?.value;

    if (submitName && submitPass) {
      const userData = {
        username: submitName,
        password: submitPass
      };

      this.service.login(userData).subscribe(
        (response) => {
          const u = userData.username;
          localStorage.setItem('bool', 'true');
          if (response === "Invalid login credentials: Username doesn't exist") {
            this.password = true;
            this.userName = true;
            this.loginPage.reset();
            this.markFormGroupTouched(this.loginPage);
          } else if (response === "Password mismatch") {
            this.password = true;
            this.userName = true;
            this.loginPage.reset();
            this.markFormGroupTouched(this.loginPage);
          } else {
            localStorage.setItem('name', userData.username);
            this.password = true;
            this.userName = true;
            const token = JSON.parse(response).token;
            localStorage.setItem('mytoken', token);
            this.router.navigate(['/home']);
          }
        },
        (error) => {
          this.markFormGroupTouched(this.loginPage);
          console.log("error", error);
        }
      );
    } else {
      if (this.loginPage.invalid) {
        this.markFormGroupTouched(this.loginPage);
      }
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}

