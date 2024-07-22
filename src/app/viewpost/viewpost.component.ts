import { Component, OnInit } from '@angular/core';
import { ServiceService} from '../Services/service.service';
import { Post} from '../classes&interfaces/post';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-viewpost',
    templateUrl: './viewpost.component.html',
    styleUrls: ['./viewpost.component.css']
})
export class ViewpostComponent implements OnInit {

    currentNumber: number | undefined;
    post: Post[] | null = null;

    constructor(private service: ServiceService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.currentNumber = +params['id'];

            this.service.viewPosts(this.currentNumber).subscribe((pos) => {
                this.post = pos;
            });
        });
    }

    goBack(): void {
      

        if (this.currentNumber) {
          this.service.views(this.currentNumber).subscribe(() => {
              console.log('View count updated successfully');
              window.history.back();
          }, error => {
              console.error('Failed to update view count', error);
              window.history.back();
          });
      } else {
          
          window.history.back();
      }
  }
    }


