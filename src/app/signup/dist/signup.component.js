"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SignupComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var password_validator_1 = require("../validators/password.validator");
var username_validator_1 = require("../validators/username.validator");
var SignupComponent = /** @class */ (function () {
    function SignupComponent(service, fb) {
        this.service = service;
        this.fb = fb;
        this.showPassword = false;
        this.showPassword2 = false;
        this.cond = false;
    }
    SignupComponent.prototype.ngOnInit = function () {
        var _this = this;
        var _a;
        this.registrationForm = this.fb.group({
            firstName: ['', [forms_1.Validators.required, forms_1.Validators.minLength(3), username_validator_1.forbiddenNameValidator(/FirstName|admin|username|Password|PASSWORD|Admin|ADMIN|Username|USERNAME|UserName|Name|name/)]],
            lastName: ['', [forms_1.Validators.required, forms_1.Validators.minLength(3), username_validator_1.forbiddenNameValidator(/lastname|admin|username|Admin|ADMIN|Username|USERNAME|UserName|Name|name/)]],
            email: ['', forms_1.Validators.required],
            phoneNumber: ['', forms_1.Validators.required],
            subscribe: [false],
            password: ['', forms_1.Validators.required],
            confirmPassword: ['', forms_1.Validators.required],
            address: this.fb.group({
                city: ['', forms_1.Validators.required],
                state: ['', forms_1.Validators.required],
                postalCode: ['', [forms_1.Validators.required, forms_1.Validators.minLength(6)]]
            })
        }, { validator: password_validator_1.PasswordValidator });
        (_a = this.registrationForm.get('subscribe')) === null || _a === void 0 ? void 0 : _a.valueChanges.subscribe(function (checkedvalue) {
            var email = _this.registrationForm.get('email');
            if (checkedvalue) {
                email === null || email === void 0 ? void 0 : email.setValidators(forms_1.Validators.required);
            }
            else {
                email === null || email === void 0 ? void 0 : email.clearValidators();
            }
            email === null || email === void 0 ? void 0 : email.updateValueAndValidity();
        });
    };
    SignupComponent.prototype.register = function () {
        var _this = this;
        var _a, _b, _c, _d, _e;
        var passwordvalue = (_a = this.registrationForm.get('password')) === null || _a === void 0 ? void 0 : _a.value;
        var firstnamevalue = (_b = this.registrationForm.get('firstName')) === null || _b === void 0 ? void 0 : _b.value;
        var lastnamevalue = (_c = this.registrationForm.get('lastName')) === null || _c === void 0 ? void 0 : _c.value;
        var email = (_d = this.registrationForm.get('email')) === null || _d === void 0 ? void 0 : _d.value;
        var phoneNumber = (_e = this.registrationForm.get('phoneNumber')) === null || _e === void 0 ? void 0 : _e.value;
        if (passwordvalue && firstnamevalue && email && phoneNumber && lastnamevalue) {
            console.log("valid");
            var userData = {
                "username": firstnamevalue + lastnamevalue,
                "password": passwordvalue
            };
            console.log(userData);
            this.service.register(userData).subscribe(function (response) {
                _this.cond = true;
                console.log('Registration successful:', response);
                _this.registrationForm.reset();
            });
        }
        else {
            console.log("Enter all details");
            this.cond = false;
            if (this.registrationForm.invalid) {
                this.markFormGroupTouched(this.registrationForm);
            }
        }
    };
    SignupComponent.prototype.markFormGroupTouched = function (formGroup) {
        var _this = this;
        Object.values(formGroup.controls).forEach(function (control) {
            control.markAsTouched();
            if (control instanceof forms_1.FormGroup) {
                _this.markFormGroupTouched(control);
            }
        });
    };
    SignupComponent.prototype.togglePasswordVisibility = function () {
        this.showPassword = !this.showPassword;
    };
    SignupComponent.prototype.togglePasswordVisibility2 = function () {
        this.showPassword2 = !this.showPassword2;
    };
    Object.defineProperty(SignupComponent.prototype, "firstName", {
        get: function () {
            return this.registrationForm.get('firstName');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SignupComponent.prototype, "email", {
        get: function () {
            return this.registrationForm.get('email');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SignupComponent.prototype, "phoneNumber", {
        get: function () {
            return this.registrationForm.get('phoneNumber');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SignupComponent.prototype, "isPasswordInvalid", {
        get: function () {
            var passwordControl = this.registrationForm.get('password');
            var pvalue = " ";
            pvalue = passwordControl === null || passwordControl === void 0 ? void 0 : passwordControl.value;
            var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
            return (passwordControl === null || passwordControl === void 0 ? void 0 : passwordControl.touched) && (!passwordRegex.test(pvalue));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SignupComponent.prototype, "lastName", {
        get: function () {
            return this.registrationForm.get('lastName');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SignupComponent.prototype, "validEmail", {
        get: function () {
            var email = this.registrationForm.get('email');
            var emailvalue = email === null || email === void 0 ? void 0 : email.value;
            var regex = /^\S+@\S+\.\S+$/;
            return (email === null || email === void 0 ? void 0 : email.touched) && (!regex.test(emailvalue));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SignupComponent.prototype, "phoneNumberValid", {
        get: function () {
            var phoneNumber = this.registrationForm.get('phoneNumber');
            var phoneNumberValue = phoneNumber === null || phoneNumber === void 0 ? void 0 : phoneNumber.value;
            var regex = /^[6-9][0-9]{9}$/;
            return (phoneNumber === null || phoneNumber === void 0 ? void 0 : phoneNumber.touched) && (!regex.test(phoneNumberValue));
        },
        enumerable: false,
        configurable: true
    });
    SignupComponent = __decorate([
        core_1.Component({
            selector: 'app-signup',
            templateUrl: './signup.component.html',
            styleUrls: ['./signup.component.css']
        })
    ], SignupComponent);
    return SignupComponent;
}());
exports.SignupComponent = SignupComponent;
