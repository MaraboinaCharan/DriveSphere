"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var login_component_1 = require("./login/login.component");
var signup_component_1 = require("./signup/signup.component");
var home_component_1 = require("./home/home.component");
var http_1 = require("@angular/common/http");
var posts_component_1 = require("./posts/posts.component");
var addpost_component_1 = require("./addpost/addpost.component");
var auth_interceptor_1 = require("src/app/Interceptor/auth.interceptor");
var viewpost_component_1 = require("./viewpost/viewpost.component");
var addcategory_component_1 = require("./addcategory/addcategory.component");
var categorybyname_component_1 = require("./categorybyname/categorybyname.component");
var myposts_component_1 = require("./myposts/myposts.component");
var editpost_component_1 = require("./editpost/editpost.component");
var form_field_1 = require("@angular/material/form-field");
var input_1 = require("@angular/material/input");
var button_1 = require("@angular/material/button");
var icon_1 = require("@angular/material/icon");
var animations_1 = require("@angular/platform-browser/animations");
var header_component_1 = require("./header/header.component");
var footer_component_1 = require("./footer/footer.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginComponent,
                signup_component_1.SignupComponent,
                home_component_1.HomeComponent,
                posts_component_1.PostsComponent,
                addpost_component_1.AddpostComponent,
                viewpost_component_1.ViewpostComponent,
                addcategory_component_1.AddcategoryComponent,
                categorybyname_component_1.CategoryByNameComponent,
                myposts_component_1.MyPostsComponent,
                editpost_component_1.EditpostComponent,
                header_component_1.HeaderComponent,
                footer_component_1.FooterComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpClientModule,
                animations_1.BrowserAnimationsModule,
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                form_field_1.MatFormFieldModule,
                input_1.MatInputModule,
                button_1.MatButtonModule,
                icon_1.MatIconModule
            ],
            providers: [
                { provide: http_1.HTTP_INTERCEPTORS, useClass: auth_interceptor_1.AuthInterceptor, multi: true }
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
