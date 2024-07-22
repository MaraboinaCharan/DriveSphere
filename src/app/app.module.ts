import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { PostsComponent } from './posts/posts.component';
import { AddpostComponent } from './addpost/addpost.component';
import { AuthInterceptor } from 'src/app/Interceptor/auth.interceptor';
import { ViewpostComponent } from './viewpost/viewpost.component';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { CategoryByNameComponent } from './categorybyname/categorybyname.component';
import { MyPostsComponent } from './myposts/myposts.component';
import { EditpostComponent } from './editpost/editpost.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
  declarations: [
     AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    PostsComponent,
    AddpostComponent,
    ViewpostComponent,
    AddcategoryComponent,
    CategoryByNameComponent,
    MyPostsComponent,
    EditpostComponent,
    HeaderComponent,
    FooterComponent
   
    ],
  imports: [ 
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule
  ],

  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
