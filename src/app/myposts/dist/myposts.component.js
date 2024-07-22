"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MyPostsComponent = void 0;
var core_1 = require("@angular/core");
var MyPostsComponent = /** @class */ (function () {
    function MyPostsComponent(service, router) {
        this.service = service;
        this.router = router;
        this.posts = null;
        this.post = [];
    }
    MyPostsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.myPosts().subscribe(function (data) {
            console.log(data);
            _this.posts = data;
        }, function (error) {
            console.error('Error fetching myposts:', error);
        });
        this.updateViews();
    };
    MyPostsComponent.prototype.viewPosts = function (id, val) {
        var _this = this;
        this.service.viewPosts(id).subscribe(function (post) {
            console.log("get post");
            _this.post = post;
            _this.service.updatePost(post);
        });
    };
    MyPostsComponent.prototype.deletePost = function (id) {
        var _this = this;
        this.service.deletePost(id).subscribe(function () {
            var _a, _b;
            console.log("Post " + id + " deleted successfully");
            if (_this.posts) {
                _this.posts.userItems = (_b = (_a = _this.posts.userItems) === null || _a === void 0 ? void 0 : _a.filter(function (post) { return post.PostId !== id; })) !== null && _b !== void 0 ? _b : [];
                _this.updateViews();
            }
        }, function (error) {
            console.error("Failed to delete post " + id, error);
        });
    };
    MyPostsComponent.prototype.fetchPosts = function () {
        var _this = this;
        this.service.getAllPosts().subscribe(function (posts) {
            _this.post = posts;
        }, function (error) {
            console.error('Error fetching posts:', error);
        });
    };
    MyPostsComponent.prototype.updateViews = function () {
        var _this = this;
        this.service.myPosts().subscribe(function (data) {
            console.log(data);
            _this.posts = data;
        }, function (error) {
            console.error('Error fetching myposts:', error);
        });
    };
    MyPostsComponent.prototype.editPost = function (id) {
        this.service.editPost(id);
    };
    MyPostsComponent.prototype.eventListeners = function (id) {
        this.viewPosts(id, "myposts");
        this.updateViews();
    };
    MyPostsComponent = __decorate([
        core_1.Component({
            selector: 'app-myposts',
            templateUrl: './myposts.component.html',
            styleUrls: ['./myposts.component.css']
        })
    ], MyPostsComponent);
    return MyPostsComponent;
}());
exports.MyPostsComponent = MyPostsComponent;
