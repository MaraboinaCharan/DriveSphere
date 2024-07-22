"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CategoryByNameComponent = void 0;
var core_1 = require("@angular/core");
var CategoryByNameComponent = /** @class */ (function () {
    function CategoryByNameComponent(service, route) {
        this.service = service;
        this.route = route;
        this.categoryData = null;
        this.posts = [];
        this.post = [];
    }
    CategoryByNameComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.currentCat.subscribe(function (cat) {
            _this.categoryData = cat;
            console.log(cat);
        });
        this.updateViews();
        this.route.params.subscribe(function (params) {
            _this.categoryName = params['category'];
            if (_this.categoryName) {
                _this.getPostsByCategory(_this.categoryName);
            }
        });
    };
    CategoryByNameComponent.prototype.getPostsByCategory = function (categoryName) {
        var _this = this;
        this.service.getCategoryByName(categoryName).subscribe(function (posts) {
            _this.posts = posts;
        });
    };
    CategoryByNameComponent.prototype.views = function (id) {
        this.service.views(id).subscribe(function (resp) {
            console.log(resp);
        });
    };
    CategoryByNameComponent.prototype.viewPosts = function (id) {
        var _this = this;
        return this.service.viewPosts(id).subscribe(function (post) {
            console.log("get post");
            console.log(post);
            _this.categoryData = post;
        });
    };
    CategoryByNameComponent.prototype.updateViews = function () {
        var _this = this;
        this.service.getAllPosts().subscribe(function (data) {
            console.log(data);
            _this.posts = data;
            _this.matter = JSON.parse('data');
        });
    };
    CategoryByNameComponent.prototype.eventListeners = function (id) {
        this.viewPosts(id);
    };
    CategoryByNameComponent = __decorate([
        core_1.Component({
            selector: 'app-categorybyname',
            templateUrl: './categorybyname.component.html',
            styleUrls: ['./categorybyname.component.css']
        })
    ], CategoryByNameComponent);
    return CategoryByNameComponent;
}());
exports.CategoryByNameComponent = CategoryByNameComponent;
