"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PostsComponent = void 0;
var core_1 = require("@angular/core");
var PostsComponent = /** @class */ (function () {
    function PostsComponent(service) {
        this.service = service;
        this.posts = [];
        this.post = [];
    }
    PostsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.getAllPosts().subscribe(function (data) {
            console.log(data);
            _this.posts = data;
            _this.matter = JSON.parse('data');
        });
    };
    PostsComponent.prototype.eventListeners = function (id) {
        this.viewPosts(id);
    };
    PostsComponent.prototype.viewPosts = function (id) {
        var _this = this;
        this.service.viewPosts(id).subscribe(function (post) {
            console.log("get post");
            _this.post = post;
            _this.service.updatePost(post);
        });
    };
    PostsComponent.prototype.deletePost = function (id) {
        var _this = this;
        this.service.deletePost(id);
        this.service.getAllPosts().subscribe(function (data) {
            console.log(data);
            _this.posts = data;
            _this.matter = JSON.parse('data');
        });
    };
    PostsComponent.prototype.views = function (id) {
        var _this = this;
        this.service.views(id).subscribe(function (resp) {
            console.log(resp);
        });
        this.service.getAllPosts().subscribe(function (data) {
            console.log(data);
            _this.posts = data;
            _this.matter = JSON.parse('data');
        });
    };
    PostsComponent.prototype.updateViews = function () {
        var _this = this;
        this.service.getAllPosts().subscribe(function (data) {
            console.log(data);
            _this.posts = data;
            _this.matter = JSON.parse('data');
        });
    };
    PostsComponent.prototype.editPost = function (id) {
        this.service.editPost(id);
    };
    PostsComponent = __decorate([
        core_1.Component({
            selector: 'app-posts',
            templateUrl: './posts.component.html',
            styleUrls: ['./posts.component.css']
        })
    ], PostsComponent);
    return PostsComponent;
}());
exports.PostsComponent = PostsComponent;
