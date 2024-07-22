"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ServiceService = void 0;
var core_1 = require("@angular/core");
var environment_development_1 = require("src/environments/environment.development");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var ServiceService = /** @class */ (function () {
    function ServiceService(httpClient, router) {
        this.httpClient = httpClient;
        this.router = router;
        this.apiUrl = environment_development_1.environment.url;
        this.post = null;
        this.category = null;
        this.postSource = new rxjs_1.BehaviorSubject(null);
        this.currentPost = this.postSource.asObservable();
        this.catSource = new rxjs_1.BehaviorSubject(null);
        this.currentCat = this.catSource.asObservable();
    }
    ServiceService.prototype.updatePost = function (post) {
        this.postSource.next(post);
    };
    ServiceService.prototype.passCategory = function (category) {
        this.catSource.next(category);
    };
    ServiceService.prototype.deletePost = function (id, customHeaders) {
        var options = customHeaders ? { headers: customHeaders } : {};
        return this.httpClient.post(this.apiUrl + ("/deletepost/" + id), {});
    };
    ServiceService.prototype.register = function (userDetails) {
        return this.httpClient.post(this.apiUrl + '/register', userDetails, {
            responseType: 'text'
        });
    };
    ServiceService.prototype.login = function (userData) {
        return this.httpClient.post(this.apiUrl + '/login', userData, {
            responseType: 'text'
        });
    };
    ServiceService.prototype.getAllPosts = function () {
        return this.httpClient.get(this.apiUrl + '/getallposts');
    };
    ServiceService.prototype.createPost = function (data) {
        return this.httpClient.post(this.apiUrl + '/createpost', data, {
            responseType: 'text'
        });
    };
    ServiceService.prototype.viewPosts = function (id) {
        this.router.navigate(['/posts', id]);
        return this.httpClient.get(this.apiUrl + ("/getpostsbyid/" + id));
    };
    ServiceService.prototype.viewPosts2 = function (id) {
        return this.httpClient.get(this.apiUrl + ("/getpostsbyid/" + id));
    };
    ServiceService.prototype.addProduct = function (productObj) {
        return this.httpClient.post(this.apiUrl + '/createpost', productObj);
    };
    ServiceService.prototype.addCategory = function (value) {
        var obj = {
            categoryName: value
        };
        return this.httpClient.post(this.apiUrl + '/addcategoryname', obj, {
            responseType: 'text'
        });
    };
    ServiceService.prototype.getAllCategory = function () {
        return this.httpClient.get(this.apiUrl + '/getallcategory');
    };
    ServiceService.prototype.getCategoryByName = function (category) {
        var _this = this;
        return this.httpClient.get(this.apiUrl + ("/category/" + category)).pipe(operators_1.tap(function (categoryData) {
            _this.passCategory(categoryData);
        }));
    };
    ServiceService.prototype.myPosts = function () {
        return this.httpClient.get(this.apiUrl + '/userposts');
    };
    ServiceService.prototype.views = function (id) {
        var body = {};
        return this.httpClient.put(this.apiUrl + ("/countviews/" + id), body);
    };
    ServiceService.prototype.editPost = function (postId) {
        this.router.navigate(['/editpost/', postId]);
    };
    ServiceService.prototype.editPost2 = function (id, obj) {
        var editPayload = {
            Category: obj.Category,
            Title: obj.Title,
            ProductImage: obj.FileName,
            Price: obj.Price,
            Status: obj.Status,
            Description: obj.Description,
            Address: obj.Address
        };
        return this.httpClient.post(this.apiUrl + ("/editpost/" + id), editPayload, {
            responseType: 'text'
        });
    };
    ServiceService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ServiceService);
    return ServiceService;
}());
exports.ServiceService = ServiceService;
