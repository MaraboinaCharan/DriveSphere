"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EditpostComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var EditpostComponent = /** @class */ (function () {
    function EditpostComponent(service, route, fb) {
        this.service = service;
        this.route = route;
        this.fb = fb;
        this.selectedImage = null;
        this.imageSrc = null;
    }
    Object.defineProperty(EditpostComponent.prototype, "title", {
        get: function () {
            return this.postForm.get('Title');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditpostComponent.prototype, "price", {
        get: function () {
            return this.postForm.get('Price');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditpostComponent.prototype, "desc", {
        get: function () {
            return this.postForm.get('Description');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditpostComponent.prototype, "status", {
        get: function () {
            return this.postForm.get('Status');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditpostComponent.prototype, "img", {
        get: function () {
            return this.postForm.get('FileName');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditpostComponent.prototype, "category", {
        get: function () {
            return this.postForm.get('Category');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditpostComponent.prototype, "address", {
        get: function () {
            return this.postForm.get('Address');
        },
        enumerable: false,
        configurable: true
    });
    EditpostComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.postForm = this.fb.group({
            Title: ['', forms_1.Validators.required],
            Description: ['', forms_1.Validators.required],
            Price: ['', forms_1.Validators.required],
            Status: ['', forms_1.Validators.required],
            Category: [null, forms_1.Validators.required],
            Address: ['', forms_1.Validators.required],
            FileName: ['', forms_1.Validators.required]
        });
        this.service.getAllCategory().subscribe(function (resp) {
            console.log(resp);
            _this.categoryy = resp;
        });
        this.postId = this.route.snapshot.paramMap.get('id');
        this.service.viewPosts2(this.postId).subscribe(function (resp) {
            console.log(resp);
            _this.postDetails = resp[0];
            var str = resp[0].Price;
            _this.postDetails.Price = parseFloat(str.replace(/[^\d.-]/g, ''));
            _this.postForm.patchValue(_this.postDetails);
            _this.selectedFile = resp[0].FileName;
            console.log(_this.selectedFile);
        }, function (error) {
            console.error('Error fetching post details:', error);
        });
    };
    // displaySelectedImage() {
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     this.imageSrc = reader.result;
    //   };
    //   reader.readAsDataURL(this.selectedFile as Blob);
    // }
    EditpostComponent.prototype.Reset = function () {
        this.postForm.reset();
        this.postForm.markAsUntouched();
    };
    EditpostComponent.prototype.onCategoryChange = function (event) {
        var _a, _b;
        var selectedCategory = event.target.value;
        (_a = this.postForm.get('Category')) === null || _a === void 0 ? void 0 : _a.setValue(selectedCategory);
        (_b = this.postForm.get('Category')) === null || _b === void 0 ? void 0 : _b.markAsTouched();
    };
    // uploadPost(event: any) {
    //   let reader = new FileReader();
    //   reader.readAsDataURL(event.target.files[0]);
    //   reader.onload = (loadEvent: any) => {
    //     let pImage = reader.result?.toString()
    //       .replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');
    //     this.postForm.value.FileName = pImage;
    //   };
    //   this.postForm.get('FileName')?.markAsTouched();
    // }
    // uploadPost(event: any) {
    //   const file = event.target.files[0];
    //   const reader = new FileReader();
    //   reader.onload = (loadEvent: any) => {
    //     const pImage = loadEvent.target.result?.toString()
    //       .replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');
    //     this.postForm.patchValue({
    //       FileName: pImage
    //     });
    //     this.postForm.get('FileName')?.markAsTouched();
    //   };
    //   reader.readAsDataURL(file);
    // }
    // uploadPost(event: any) {
    //   const file = event.target.files[0]; 
    //   const reader = new FileReader();
    //   reader.onload = (loadEvent: any) => {
    //     this.selectedImage = loadEvent.target.result; 
    //     let pImage = reader.result?.toString().replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');
    //     this.postForm.controls['FileName'].setValue(pImage);
    //     const pImage2 = this.selectedImage?.toString().replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');
    //     const formValue = this.postForm.value;
    //     formValue.FileName = pImage2; 
    //     this.postForm.setValue(formValue);
    //     this.postForm.get('FileName')?.markAsTouched();
    //     this.displaySelectedImage(); 
    //   };
    //   reader.readAsDataURL(file);
    // }
    //working uploadpost
    EditpostComponent.prototype.uploadPost = function (event) {
        var _this = this;
        var _a, _b;
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = function (loadEvent) {
            var _a, _b;
            _this.selectedImage = loadEvent.target.result;
            var pImage = (_a = reader.result) === null || _a === void 0 ? void 0 : _a.toString().replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');
            _this.postForm.controls['FileName'].setValue(pImage);
            // };
            // reader.onload = (loadEvent: any) => {
            var pImage2 = (_b = _this.selectedImage) === null || _b === void 0 ? void 0 : _b.toString().replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');
            var formValue = _this.postForm.value;
            formValue.FileName = pImage2;
            _this.postForm.setValue(formValue);
        };
        (_a = this.postForm.get('FileName')) === null || _a === void 0 ? void 0 : _a.markAsTouched();
        reader.readAsDataURL(file);
        (_b = this.postForm.get('FileName')) === null || _b === void 0 ? void 0 : _b.markAsTouched();
    };
    // uploadPost(event: any) {
    //   const file = event.target.files[0]; 
    //   const reader = new FileReader();
    //   reader.onload = (loadEvent: any) => {
    //     this.selectedFile = file; // Assigning the selected file to the variable
    //     const pImage = loadEvent.target.result?.toString()
    //       .replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');
    //     const formValue = this.postForm.value;
    //     formValue.FileName = pImage; 
    //     this.postForm.setValue(formValue);
    //     this.postForm.get('FileName')?.markAsTouched();
    //     this.displaySelectedImage(); 
    //   };
    //   reader.readAsDataURL(file);
    // }
    EditpostComponent.prototype.displaySelectedImage = function () {
        var _this = this;
        var reader = new FileReader();
        reader.onload = function () {
            _this.imageSrc = reader.result;
        };
        reader.readAsDataURL(this.selectedFile);
    };
    EditpostComponent.prototype.onSubmit = function () {
        var _this = this;
        var updatedPostData = this.postForm.value;
        if (this.postForm.invalid) {
            this.markAllAsTouched();
            return;
        }
        var productImageControl = this.postForm.get('ProductImage');
        if (productImageControl && productImageControl.errors) {
            productImageControl.setErrors({ 'required': true });
            return;
        }
        this.service.editPost2(this.postId, updatedPostData).subscribe(function (response) {
            console.log(updatedPostData);
            console.log(response);
            _this.postForm.reset();
        }, function (error) {
            console.error('Error updating post:', error);
        });
    };
    EditpostComponent.prototype.markAllAsTouched = function () {
        var _this = this;
        Object.keys(this.postForm.controls).forEach(function (controlName) {
            var _a;
            (_a = _this.postForm.get(controlName)) === null || _a === void 0 ? void 0 : _a.markAsTouched();
        });
    };
    EditpostComponent = __decorate([
        core_1.Component({
            selector: 'app-editpost',
            templateUrl: './editpost.component.html',
            styleUrls: ['./editpost.component.css']
        })
    ], EditpostComponent);
    return EditpostComponent;
}());
exports.EditpostComponent = EditpostComponent;
