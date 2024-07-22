import { Component, OnInit, ViewChild } from '@angular/core';
import { Post } from '../classes&interfaces/post';
import { ServiceService} from '../Services/service.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: Post[] = [];
  post: Post[]= [];
  matter: any;
  pagedPosts: Post[] = [];
  totalPosts: number = 0;
  pageSize: number = 5; 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private service: ServiceService) {}

  ngOnInit(): void {
    this.service.getAllPosts().subscribe(
      (data: Post[]) => {
        console.log(data);
        this.posts = data;
        this.matter = JSON.parse('data');
      }
    );

  
    // this.loadPosts()
  }

  // loadPosts(): void {
  //   this.service.getAllPosts().subscribe(
  //     (data: Post[]) => {
  //       this.posts = data;
  //       this.totalPosts = this.posts.length;
  //       this.paginatePosts();
  //     }
  //   );
  // }

  // onPageChange(event: PageEvent): void {
  //   const startIndex = event.pageIndex * event.pageSize;
  //   this.pagedPosts = this.posts.slice(startIndex, startIndex + event.pageSize);
  // }

  // paginatePosts(): void {
  //   this.paginator.firstPage();
  //   this.pagedPosts = this.posts.slice(0, this.pageSize);
  // }



  eventListeners(id: any): void {
    this.viewPosts(id);
    
  }

  viewPosts(id: number): void {
    this.service.viewPosts(id).subscribe((post) => {
      console.log("get post");
      this.post = post;
      this.service.updatePost(post);
    });
  }

  deletePost(id: number): void { 
    this.service.deletePost(id);
    this.service.getAllPosts().subscribe(
      (data: Post[]) => {
        console.log(data);
        this.posts = data;
        this.matter = JSON.parse('data');
      }
    );
  }

  views(id: number): void {
    this.service.views(id).subscribe((resp) => {
      console.log(resp);
    });

    this.service.getAllPosts().subscribe(
      (data: Post[]) => {
        console.log(data);
        this.posts = data;
        this.matter = JSON.parse('data');
      }
    );
  }

  updateViews(): void {
    this.service.getAllPosts().subscribe(
      (data: Post[]) => {
        console.log(data);
        this.posts = data;
        this.matter = JSON.parse('data');
      }
    );
  }

  editPost(id: number): void {
    this.service.editPost(id);
  }
}



