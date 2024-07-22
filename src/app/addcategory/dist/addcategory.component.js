"use strict";
// import { Component } from '@angular/core';
// import { ServiceService } from '../Services/service.service';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddcategoryComponent = void 0;
// @Component({
//   selector: 'app-addcategory',
//   templateUrl: './addcategory.component.html',
//   styleUrls: ['./addcategory.component.css'],
// })
// export class AddcategoryComponent {
//   inputvalue: any;
//   constructor(private service: ServiceService) {}
//   addcategory(event: any) {
//     this.inputvalue = event.target.value;
//     this.service.addcategory(this.inputvalue).subscribe((response) => {
//       console.log(response);
//       alert("Category added successfully !")
//       this.inputvalue.reset()
//     });
//   }
// }
var core_1 = require("@angular/core");
var AddcategoryComponent = /** @class */ (function () {
    function AddcategoryComponent(service, route) {
        this.service = service;
        this.route = route;
        this.posts = null;
    }
    AddcategoryComponent.prototype.ngOnInit = function () {
    };
    AddcategoryComponent.prototype.addCategory = function (event) {
        this.inputValue = event.target.value;
        this.service.addCategory(this.inputValue).subscribe(function (response) {
            console.log(response);
            alert("Category added successfully !");
            event.target.value = '';
        });
    };
    AddcategoryComponent = __decorate([
        core_1.Component({
            selector: 'app-addcategory',
            templateUrl: './addcategory.component.html',
            styleUrls: ['./addcategory.component.css']
        })
    ], AddcategoryComponent);
    return AddcategoryComponent;
}());
exports.AddcategoryComponent = AddcategoryComponent;
