
import { Component, OnInit } from '@angular/core';
import { Post } from '../classes&interfaces/post';
import { ServiceService} from '../Services/service.service';
import { Category } from '../categorybyname/Category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myposts',
  templateUrl: './myposts.component.html',
  styleUrls: ['./myposts.component.css']
})
export class MyPostsComponent implements OnInit {
  posts: Category | null = null;
  post: Post[] = [];
  matter: any;
  username: any;

  constructor(private service: ServiceService, private router: Router) {}

  ngOnInit(): void {

    this.service.myPosts().subscribe(
      (data: Category) => {
        console.log(data);
        this.posts = data;
      },
      (error) => {
        console.error('Error fetching myposts:', error);
      }
    );

    this.updateViews()
  }

  viewPosts(id: any, val: any): void {
    this.service.viewPosts(id).subscribe((post) => {
      console.log("get post");
      this.post = post;
      this.service.updatePost(post);
    });
  }

  deletePost(id: any): void { 
    this.service.deletePost(id).subscribe(() => {
      console.log(`Post ${id} deleted successfully`);
      if (this.posts) {
        this.posts.userItems = this.posts.userItems?.filter((post: Post) => post.PostId !== id) ?? [];
        this.updateViews()
      }
    }, error => {
      console.error(`Failed to delete post ${id}`, error);
    });
  }
  
  fetchPosts(): void {
    this.service.getAllPosts().subscribe(
      (posts) => {
        this.post = posts;
      },
      (error) => {
        console.error('Error fetching posts:', error);
      }
    );
  }

  updateViews(): void {
    this.service.myPosts().subscribe(
      (data: Category) => {
        console.log(data);
        this.posts = data;
      },
      (error) => {
        console.error('Error fetching myposts:', error);
      }
    );
  }

  editPost(id: number): void {
    this.service.editPost(id);
  }

  eventListeners(id: any): void {
    this.viewPosts(id,"myposts");
    this.updateViews();
  }
}

