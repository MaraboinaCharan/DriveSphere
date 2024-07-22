"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HeaderComponent = void 0;
var core_1 = require("@angular/core");
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(service, router) {
        this.service = service;
        this.router = router;
        this.toggled = false;
        this.postsToggled = true;
        this.addPostBol = false;
        this.addCategoryToggle = false;
        this.myPostsToggle = false;
        this.editPostToggle = false;
        this.addPostToggled = false;
        this.postTl = false;
        this.myPostTl = false;
        this.categoryData = null;
        this.posts = [];
        this.selectedCategory = 'Category';
        this.activeLink = '';
        this.loggedInUsername = localStorage.getItem('userName');
    }
    HeaderComponent.prototype.ngOnInit = function () {
        this.postsToggled = true;
        this.userName = localStorage.getItem('name');
        if (this.loggedInUsername) {
            this.userName = JSON.parse(this.loggedInUsername);
        }
        this.service.getAllPosts().subscribe(function (data) { });
    };
    HeaderComponent.prototype.logout = function () {
        this.router.navigate(['/login']);
    };
    HeaderComponent.prototype.toggle = function () {
        this.activeLink = 'home';
        this.selectedCategory = 'Category';
        this.router.navigate(['home']);
    };
    HeaderComponent.prototype.postsToggle = function () {
        this.activeLink = 'posts';
        this.selectedCategory = 'Category';
        this.router.navigate(['posts']);
    };
    HeaderComponent.prototype.addPost = function () {
        this.activeLink = 'addPost';
        this.selectedCategory = 'Category';
        this.router.navigate(['addpost']);
    };
    HeaderComponent.prototype.myPosts = function () {
        this.activeLink = 'myPosts';
        this.selectedCategory = 'Category';
        this.router.navigate(['/myposts']);
    };
    HeaderComponent.prototype.editPosts = function () {
        this.selectedCategory = 'Category';
        this.router.navigate(['editpost']);
    };
    HeaderComponent.prototype.postT = function () {
        this.selectedCategory = 'Category';
        this.router.navigate(['posts']);
    };
    HeaderComponent.prototype.isActive = function (routes) {
        var _this = this;
        var matchOptions = { paths: 'subset', queryParams: 'exact', fragment: 'ignored', matrixParams: 'ignored' };
        return routes.some(function (route) { return _this.router.isActive(route, matchOptions); });
    };
    HeaderComponent.prototype.categoryByName = function (category) {
        var _this = this;
        this.selectedCategory = category;
        this.router.navigate(['/category', category]);
        this.service.getCategoryByName(category).subscribe(function (categoryData) {
            _this.categoryData = categoryData;
            _this.service.passCategory(categoryData);
        });
    };
    HeaderComponent.prototype.getAllCategory = function () {
        var _this = this;
        this.service.getAllCategory().subscribe(function (resp) {
            _this.category = resp;
        });
    };
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'app-header',
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.css']
        })
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
