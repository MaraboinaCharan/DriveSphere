"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, service, fb) {
        this.router = router;
        this.service = service;
        this.fb = fb;
        this.showPassword = false;
        this.userName = true;
        this.password = true;
    }
    Object.defineProperty(LoginComponent.prototype, "name", {
        get: function () {
            return this.loginPage.get('userName');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoginComponent.prototype, "pass", {
        get: function () {
            return this.loginPage.get('password');
        },
        enumerable: false,
        configurable: true
    });
    LoginComponent.prototype.togglePasswordVisibility = function () {
        this.showPassword = !this.showPassword;
    };
    LoginComponent.prototype.ngOnInit = function () {
        localStorage.clear();
        this.loginPage = this.fb.group({
            userName: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.required]
        });
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        var _a, _b;
        var submitName = (_a = this.loginPage.get('userName')) === null || _a === void 0 ? void 0 : _a.value;
        var submitPass = (_b = this.loginPage.get('password')) === null || _b === void 0 ? void 0 : _b.value;
        if (submitName && submitPass) {
            var userData_1 = {
                username: submitName,
                password: submitPass
            };
            this.service.login(userData_1).subscribe(function (response) {
                var u = userData_1.username;
                localStorage.setItem('bool', 'true');
                if (response === "Invalid login credentials: Username doesn't exist") {
                    _this.password = true;
                    _this.userName = true;
                    _this.loginPage.reset();
                    _this.markFormGroupTouched(_this.loginPage);
                }
                else if (response === "Password mismatch") {
                    _this.password = true;
                    _this.userName = true;
                    _this.loginPage.reset();
                    _this.markFormGroupTouched(_this.loginPage);
                }
                else {
                    localStorage.setItem('name', userData_1.username);
                    _this.password = true;
                    _this.userName = true;
                    var token = JSON.parse(response).token;
                    localStorage.setItem('mytoken', token);
                    _this.router.navigate(['/home']);
                }
            }, function (error) {
                _this.markFormGroupTouched(_this.loginPage);
                console.log("error", error);
            });
        }
        else {
            if (this.loginPage.invalid) {
                this.markFormGroupTouched(this.loginPage);
            }
        }
    };
    LoginComponent.prototype.markFormGroupTouched = function (formGroup) {
        var _this = this;
        Object.values(formGroup.controls).forEach(function (control) {
            control.markAsTouched();
            if (control instanceof forms_1.FormGroup) {
                _this.markFormGroupTouched(control);
            }
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
