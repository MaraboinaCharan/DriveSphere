
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../Services/service.service';
import { forbiddenNameValidator } from '../validators/username.validator';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css'],
})
export class AddpostComponent implements OnInit {
  successMessage: string | null = null;
  categoryy: any;
  userData: any;
  cond: boolean = false;

  constructor(
    private httpClient: HttpClient,
    private service: ServiceService,
    private fb: FormBuilder
  ) {}

  registrationForm!: FormGroup;

  get title() {
        return this.registrationForm.get('Title');
      }
      get price() {
        return this.registrationForm.get('Price');
      }
      get desc() {
        return this.registrationForm.get('Description');
      }
      get status() {
        return this.registrationForm.get('Status');
      }
    
      get category() {
        return this.registrationForm.get('Category');
      }
      get address() {
        return this.registrationForm.get('Address');
      }
      get img()
      {
        return this.registrationForm.get('ProductImage')
      }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      Title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          forbiddenNameValidator(/title|TITLE|Title|TiTle/),
        ],
      ],
      Description: ['', [Validators.required, Validators.minLength(10)]],
      Price: ['', Validators.required],
      Status: ['', Validators.required],
      Category: ['', Validators.required],
      Address: ['', Validators.required],
      ProductImage: ['',Validators.required],
    });

    this.service.getAllCategory().subscribe(
      (resp: any) => {
        console.log(resp);
        this.categoryy = resp;
      }
    );

    this.registrationForm
      .get('subscribe')
      ?.valueChanges.subscribe((checkedvalue) => {});
  }

  onCategoryChange(event: any) {
    const selectedCategory = event.target.value;
    this.registrationForm.get('Category')?.setValue(selectedCategory);
  }
  
  resetForm() {
    this.registrationForm.reset();
  }

  register() {
    let userData = this.registrationForm.value;
    if (this.registrationForm.invalid) {
      this.markAllAsTouched();
      return; 
    }
    const productImageControl = this.registrationForm.get('ProductImage');
    if (productImageControl && productImageControl.errors) {
      productImageControl.setErrors({ 'required': true });
      return;
    }
    if (userData) {
      this.service.addProduct(userData).subscribe((response) => {
        this.cond=true
        this.successMessage = 'Post added successfully';
        console.log('Registration successful:', response);
        this.registrationForm.reset();
      });
    } else {
      this.markAllAsTouched();
      this.cond=false;
    }
  }


  selectedImage: string | ArrayBuffer | null = null; 

uploadPost(event: any) {
  let reader = new FileReader();
  reader.readAsDataURL(event.target.files[0]);
  reader.onload = (loadEvent: any) => {
    this.selectedImage = loadEvent.target.result; 
    let pImage = reader.result?.toString().replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');
    this.registrationForm.controls['ProductImage'].setValue(pImage);
  };
}


  // uploadPost(event: any) {
  //   let reader = new FileReader();
  //   reader.readAsDataURL(event.target.files[0]);
  //   reader.onload = (loadEvent: any) => {
  //     let pImage = reader.result
  //       ?.toString()
  //       .replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');
  //     console.log(pImage);
  //     this.registrationForm.controls['ProductImage'].setValue(pImage);
  //     console.log(this.registrationForm.controls['ProductImage'].value);
  //   };
  // }

  markAllAsTouched() {
    Object.keys(this.registrationForm.controls).forEach(controlName => {
      this.registrationForm.get(controlName)?.markAsTouched();
    });
  } 
}
