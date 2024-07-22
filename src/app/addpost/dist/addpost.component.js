"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddpostComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var username_validator_1 = require("../validators/username.validator");
var AddpostComponent = /** @class */ (function () {
    function AddpostComponent(httpClient, service, fb) {
        this.httpClient = httpClient;
        this.service = service;
        this.fb = fb;
        this.successMessage = null;
        this.cond = false;
        this.selectedImage = null;
    }
    Object.defineProperty(AddpostComponent.prototype, "title", {
        get: function () {
            return this.registrationForm.get('Title');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddpostComponent.prototype, "price", {
        get: function () {
            return this.registrationForm.get('Price');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddpostComponent.prototype, "desc", {
        get: function () {
            return this.registrationForm.get('Description');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddpostComponent.prototype, "status", {
        get: function () {
            return this.registrationForm.get('Status');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddpostComponent.prototype, "category", {
        get: function () {
            return this.registrationForm.get('Category');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddpostComponent.prototype, "address", {
        get: function () {
            return this.registrationForm.get('Address');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddpostComponent.prototype, "img", {
        get: function () {
            return this.registrationForm.get('ProductImage');
        },
        enumerable: false,
        configurable: true
    });
    AddpostComponent.prototype.ngOnInit = function () {
        var _this = this;
        var _a;
        this.registrationForm = this.fb.group({
            Title: [
                '',
                [
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(3),
                    username_validator_1.forbiddenNameValidator(/title|TITLE|Title|TiTle/),
                ],
            ],
            Description: ['', [forms_1.Validators.required, forms_1.Validators.minLength(10)]],
            Price: ['', forms_1.Validators.required],
            Status: ['', forms_1.Validators.required],
            Category: ['', forms_1.Validators.required],
            Address: ['', forms_1.Validators.required],
            ProductImage: ['', forms_1.Validators.required]
        });
        this.service.getAllCategory().subscribe(function (resp) {
            console.log(resp);
            _this.categoryy = resp;
        });
        (_a = this.registrationForm
            .get('subscribe')) === null || _a === void 0 ? void 0 : _a.valueChanges.subscribe(function (checkedvalue) { });
    };
    AddpostComponent.prototype.onCategoryChange = function (event) {
        var _a;
        var selectedCategory = event.target.value;
        (_a = this.registrationForm.get('Category')) === null || _a === void 0 ? void 0 : _a.setValue(selectedCategory);
    };
    AddpostComponent.prototype.resetForm = function () {
        this.registrationForm.reset();
    };
    AddpostComponent.prototype.register = function () {
        var _this = this;
        var userData = this.registrationForm.value;
        if (this.registrationForm.invalid) {
            this.markAllAsTouched();
            return;
        }
        var productImageControl = this.registrationForm.get('ProductImage');
        if (productImageControl && productImageControl.errors) {
            productImageControl.setErrors({ 'required': true });
            return;
        }
        if (userData) {
            this.service.addProduct(userData).subscribe(function (response) {
                _this.cond = true;
                _this.successMessage = 'Post added successfully';
                console.log('Registration successful:', response);
                _this.registrationForm.reset();
            });
        }
        else {
            this.markAllAsTouched();
            this.cond = false;
        }
    };
    AddpostComponent.prototype.uploadPost = function (event) {
        var _this = this;
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = function (loadEvent) {
            var _a;
            _this.selectedImage = loadEvent.target.result;
            var pImage = (_a = reader.result) === null || _a === void 0 ? void 0 : _a.toString().replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');
            _this.registrationForm.controls['ProductImage'].setValue(pImage);
        };
    };
    // uploadPost(event: any) {
    //   let reader = new FileReader();
    //   reader.readAsDataURL(event.target.files[0]);
    //   reader.onload = (loadEvent: any) => {
    //     let pImage = reader.result
    //       ?.toString()
    //       .replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');
    //     console.log(pImage);
    //     this.registrationForm.controls['ProductImage'].setValue(pImage);
    //     console.log(this.registrationForm.controls['ProductImage'].value);
    //   };
    // }
    AddpostComponent.prototype.markAllAsTouched = function () {
        var _this = this;
        Object.keys(this.registrationForm.controls).forEach(function (controlName) {
            var _a;
            (_a = _this.registrationForm.get(controlName)) === null || _a === void 0 ? void 0 : _a.markAsTouched();
        });
    };
    AddpostComponent = __decorate([
        core_1.Component({
            selector: 'app-addpost',
            templateUrl: './addpost.component.html',
            styleUrls: ['./addpost.component.css']
        })
    ], AddpostComponent);
    return AddpostComponent;
}());
exports.AddpostComponent = AddpostComponent;
