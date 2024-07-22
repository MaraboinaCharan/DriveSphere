// import { Component } from '@angular/core';
// import { ServiceService } from '../Services/service.service';

// @Component({
//   selector: 'app-addcategory',
//   templateUrl: './addcategory.component.html',
//   styleUrls: ['./addcategory.component.css'],
// })
// export class AddcategoryComponent {
//   inputvalue: any;

//   constructor(private service: ServiceService) {}

//   addcategory(event: any) {
//     this.inputvalue = event.target.value;
//     this.service.addcategory(this.inputvalue).subscribe((response) => {
//       console.log(response);
//       alert("Category added successfully !")
//       this.inputvalue.reset()
//     });
//   }
// }




import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../Services/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../categorybyname/Category';
import { Post } from '../classes&interfaces/post';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css'],
})
export class AddcategoryComponent implements OnInit {
  inputValue: any;
  posts: Category | null = null;
  categoryName:any
  constructor(private service: ServiceService,private route:ActivatedRoute) {}

  ngOnInit(): void {
  }

  addCategory(event: any) {
    this.inputValue = event.target.value;
    this.service.addCategory(this.inputValue).subscribe((response) => {
      console.log(response);
      alert("Category added successfully !");
      event.target.value = '';
    });
  }
}

