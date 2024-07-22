
import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../Services/service.service';
import { IsActiveMatchOptions, Router } from '@angular/router';
import { Post } from '../classes&interfaces/post';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private service: ServiceService, private router: Router) {}
  
  userName: any;
  toggled = false;
  postsToggled = true;
  addPostBol = false;
  addCategoryToggle = false;
  myPostsToggle = false;
  editPostToggle = false;
  addPostToggled = false;
  postTl = false;
  myPostTl = false;
  category: any;
  categoryData: Post[] | null = null;
  posts: Post[] = [];
  selectedCategory: string = 'Category'
  activeLink=''
  loggedInUsername: any = localStorage.getItem('userName');

  ngOnInit(): void {
    this.postsToggled = true;
    this.userName = localStorage.getItem('name');
    if (this.loggedInUsername) {
      this.userName = JSON.parse(this.loggedInUsername);
    }
    this.service.getAllPosts().subscribe(
      (data: Post[]) => { }
    );
  }

  logout() {
    this.router.navigate(['/login']);
  }

  toggle() {
    this.activeLink = 'home'; 
    this.selectedCategory = 'Category';
    this.router.navigate(['home']);
  }

  postsToggle() {
    this.activeLink = 'posts'; 
    this.selectedCategory = 'Category';
    this.router.navigate(['posts']);
  }

  addPost() {
    this.activeLink = 'addPost'; 
    this.selectedCategory = 'Category';
    this.router.navigate(['addpost']);
  }



  myPosts() {
    this.activeLink = 'myPosts'; 
    this.selectedCategory = 'Category';
    this.router.navigate(['/myposts']);
  }

  editPosts() {
    
    this.selectedCategory = 'Category';
    this.router.navigate(['editpost']);
  }

  postT() {
    this.selectedCategory = 'Category';
    this.router.navigate(['posts']);
  }


  isActive(routes: string[]): boolean {
    const matchOptions: IsActiveMatchOptions = { paths: 'subset', queryParams: 'exact', fragment: 'ignored', matrixParams: 'ignored' };
    return routes.some(route => this.router.isActive(route, matchOptions));
  }

  categoryByName(category: any) {
    this.selectedCategory = category;
    this.router.navigate(['/category', category]);
    this.service.getCategoryByName(category).subscribe(
      (categoryData) => {
        this.categoryData = categoryData;
        this.service.passCategory(categoryData);
      }
    );
  }

  getAllCategory() {
    this.service.getAllCategory().subscribe(
      (resp) => {
        this.category = resp;
      }
    );
  }
}
