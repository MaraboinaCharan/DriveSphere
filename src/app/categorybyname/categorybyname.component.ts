
import { Component } from '@angular/core';
import { ServiceService} from '../Services/service.service';
import { Post} from '../classes&interfaces/post';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categorybyname',
  templateUrl: './categorybyname.component.html',
  styleUrls: ['./categorybyname.component.css'],
})
export class CategoryByNameComponent {
  categoryData: Post[] | null = null;
  posts: Post[] = [];
  post: Post[]= [];
  matter: any;
  categoryName:any
  constructor(private service: ServiceService,private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.service.currentCat.subscribe((cat) => {
      this.categoryData = cat;
      console.log(cat);
    });
    this.updateViews()

    this.route.params.subscribe(params => {
      this.categoryName = params['category'];

      if (this.categoryName) {
        this.getPostsByCategory(this.categoryName);
      }
    });
  }
  getPostsByCategory(categoryName: string): void {
    this.service.getCategoryByName(categoryName).subscribe(posts => {
      this.posts = posts;
    });
  }

  views(id: number) {
    this.service.views(id).subscribe(
      (resp) => {
        console.log(resp);
      }
    );

  }

  viewPosts(id: number) {
    return this.service.viewPosts(id).subscribe((post) => {
      console.log("get post");
      console.log(post);
      this.categoryData = post;
    });
  }

  updateViews() {
    this.service.getAllPosts().subscribe(
      (data: Post[]) => {
        console.log(data);
        this.posts = data;
        this.matter = JSON.parse('data');
      }
    );
  }

  eventListeners(id: any) {
    this.viewPosts(id);
   
  }
}
