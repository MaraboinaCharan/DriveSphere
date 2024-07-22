
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../Services/service.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../categorybyname/Category';

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.css'],
})
export class EditpostComponent implements OnInit {
  postId: any;
  postForm: FormGroup;
  postDetails: any;
  categoryy:any
  selectedImage: string | ArrayBuffer | null = null;
  selectedFile: any;
  imageSrc: string | ArrayBuffer | null = null;

  constructor(
    private service: ServiceService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}
  get title() {
    return this.postForm.get('Title');
  }
  get price() {
    return this.postForm.get('Price');
  }
  get desc() {
    return this.postForm.get('Description');
  }
  get status() {
    return this.postForm.get('Status');
  }
get img()
{
 return this.postForm.get('FileName')
}
  get category() {
    return this.postForm.get('Category');
  }
  get address() {
    return this.postForm.get('Address');
  }
  ngOnInit(): void {
    this.postForm = this.fb.group({
      Title: ['', Validators.required],
      Description: ['', Validators.required],
      Price: ['', Validators.required],
      Status: ['', Validators.required],
      Category: [null, Validators.required],
      Address: ['', Validators.required],
      FileName: ['', Validators.required],
    });

    this.service.getAllCategory().subscribe(
      (resp: any) => {
        console.log(resp);
        this.categoryy = resp;
      }
    );

    this.postId = this.route.snapshot.paramMap.get('id');

    this.service.viewPosts2(this.postId).subscribe(
      (resp) => {
        console.log(resp)
        this.postDetails = resp[0];
        const str: string = resp[0].Price;
        this.postDetails.Price = parseFloat(str.replace(/[^\d.-]/g, ''));
        this.postForm.patchValue(this.postDetails);
        this.selectedFile=resp[0].FileName;
        console.log(this.selectedFile)

      },
      (error) => {
        console.error('Error fetching post details:', error);
      }
    );
  }
  // displaySelectedImage() {
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     this.imageSrc = reader.result;
  //   };
  //   reader.readAsDataURL(this.selectedFile as Blob);
  // }
  
  Reset() {
    this.postForm.reset();
    this.postForm.markAsUntouched()
  }

  onCategoryChange(event: any) {
    const selectedCategory = event.target.value;
    this.postForm.get('Category')?.setValue(selectedCategory);
    this.postForm.get('Category')?.markAsTouched();
  }

  // uploadPost(event: any) {
  //   let reader = new FileReader();
  //   reader.readAsDataURL(event.target.files[0]);
  //   reader.onload = (loadEvent: any) => {
  //     let pImage = reader.result?.toString()
  //       .replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');
  //     this.postForm.value.FileName = pImage;
      
  //   };
  //   this.postForm.get('FileName')?.markAsTouched();
  // }
  // uploadPost(event: any) {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();
  
  //   reader.onload = (loadEvent: any) => {
  //     const pImage = loadEvent.target.result?.toString()
  //       .replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');
  
     
  //     this.postForm.patchValue({
  //       FileName: pImage
  //     });
  
     
  //     this.postForm.get('FileName')?.markAsTouched();
  //   };
  

  //   reader.readAsDataURL(file);
  // }

  // uploadPost(event: any) {
  //   const file = event.target.files[0]; 
  //   const reader = new FileReader();
  
  //   reader.onload = (loadEvent: any) => {
  //     this.selectedImage = loadEvent.target.result; 
  
  //     let pImage = reader.result?.toString().replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');
  //     this.postForm.controls['FileName'].setValue(pImage);
  
  //     const pImage2 = this.selectedImage?.toString().replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');
  //     const formValue = this.postForm.value;
  //     formValue.FileName = pImage2; 
  //     this.postForm.setValue(formValue);
  
  //     this.postForm.get('FileName')?.markAsTouched();
      
  //     this.displaySelectedImage(); 
  //   };
  
  //   reader.readAsDataURL(file);
  // }

  

  //working uploadpost

  uploadPost(event: any) {
    const file = event.target.files[0]; 
    const reader = new FileReader();
  

  
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (loadEvent: any) => {
      this.selectedImage = loadEvent.target.result; 
      let pImage = reader.result?.toString().replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');
      this.postForm.controls['FileName'].setValue(pImage);
    // };
    // reader.onload = (loadEvent: any) => {
      const pImage2 =this.selectedImage ?.toString()
        .replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');
        const formValue = this.postForm.value;
        formValue.FileName = pImage2; 
      this.postForm.setValue( formValue);
 
    };
    this.postForm.controls['Price'].reset();

    this.postForm.get('FileName')?.markAsTouched();

    reader.readAsDataURL(file);
  
    this.postForm.get('FileName')?.markAsTouched();
  }


  
  // uploadPost(event: any) {
  //   const file = event.target.files[0]; 
  //   const reader = new FileReader();
  
  //   reader.onload = (loadEvent: any) => {
  //     this.selectedFile = file; // Assigning the selected file to the variable
  //     const pImage = loadEvent.target.result?.toString()
  //       .replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');
  //     const formValue = this.postForm.value;
  //     formValue.FileName = pImage; 
  //     this.postForm.setValue(formValue);
  
  //     this.postForm.get('FileName')?.markAsTouched();
  //     this.displaySelectedImage(); 
  //   };
  
  //   reader.readAsDataURL(file);
  // }
  
  displaySelectedImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imageSrc = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }
  

  onSubmit() {
    const updatedPostData = this.postForm.value;
    if (this.postForm.invalid) {
      this.service.editPost2(this.postId,updatedPostData).subscribe(
        (err)=>{
          console.log(err)
        }
      )
      this.markAllAsTouched();
      return; 
    }

    const productImageControl = this.postForm.get('ProductImage');
    if (productImageControl && productImageControl.errors) {
      productImageControl.setErrors({ 'required': true });
      return;
    }
    this.service.editPost2(this.postId, updatedPostData).subscribe(
      (resp)=>{
        console.log(updatedPostData);
        console.log(resp);
        this.postForm.reset();
      },
      (error) => {
        console.error('Error updating post:', error);
      }
    );
  }
  markAllAsTouched() {
    Object.keys(this.postForm.controls).forEach(controlName => {
      this.postForm.get(controlName)?.markAsTouched();
    });
  } 
}
