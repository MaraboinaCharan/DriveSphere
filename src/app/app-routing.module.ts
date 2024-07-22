import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { ViewpostComponent } from './viewpost/viewpost.component';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { CategoryByNameComponent} from './categorybyname/categorybyname.component';
import { EditpostComponent } from './editpost/editpost.component';
import { authGuard } from 'src/authGuards/auth-guard.guard';
import { MyPostsComponent } from './myposts/myposts.component';
import { AddpostComponent } from './addpost/addpost.component';


const routes: Routes = [
  {path:'',redirectTo: '/home', pathMatch: 'full'},
  {path:'signup',component:SignupComponent},
  {path:'login',component:LoginComponent},
  {path:'home',component:HomeComponent,canActivate:[authGuard]},
  {path:'posts',component:PostsComponent,canActivate:[authGuard]},
  {path:'editpost/:id',component:EditpostComponent,canActivate:[authGuard]},
  {path:'addpost',component:AddpostComponent,canActivate:[authGuard]},
  {path:'posts/:id',component:ViewpostComponent,canActivate:[authGuard]},
  {path:'category/:category',component:CategoryByNameComponent,canActivate:[authGuard]},
  {path:'myposts',component:MyPostsComponent,canActivate:[authGuard]}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
