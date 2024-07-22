import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Post } from '../classes&interfaces/post';
import { Category } from '../categorybyname/Category';


@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  apiUrl = environment.url;

  post: Post | null = null;
  category: Post | null = null;

  constructor(private httpClient: HttpClient, private router: Router) {}

  private postSource = new BehaviorSubject<any>(null);
  currentPost = this.postSource.asObservable();

  private catSource = new BehaviorSubject<Post[] | null>(null);
  currentCat = this.catSource.asObservable();

  updatePost(post: any) {
    this.postSource.next(post);
  }

  passCategory(category: Post[]) {
    this.catSource.next(category);
  }

  deletePost(id: any, customHeaders?: any): Observable<any> {
    const options = customHeaders ? { headers: customHeaders } : {};
    return this.httpClient.post(this.apiUrl + `/deletepost/${id}`, {});
  }

  register(userDetails: any) {
    return this.httpClient.post(this.apiUrl + '/register', userDetails, {
      responseType: 'text',
    });
  }

  login(userData: any) {
    return this.httpClient.post(this.apiUrl + '/login', userData, {
      responseType: 'text',
    });
  }

  getAllPosts(): Observable<Post[]> {
    return this.httpClient.get<any[]>(this.apiUrl + '/getallposts');
  }

  createPost(data: any) {
    return this.httpClient.post(this.apiUrl + '/createpost', data, {
      responseType: 'text',
    });
  }

  viewPosts(id: any): Observable<Post[]> {
    this.router.navigate(['/posts', id]);
    return this.httpClient.get<any[]>(this.apiUrl + `/getpostsbyid/${id}`);
  }

  viewPosts2(id: any): Observable<Post[]> {
    return this.httpClient.get<any[]>(this.apiUrl + `/getpostsbyid/${id}`);
  }

  addProduct(productObj: any) {
    return this.httpClient.post(this.apiUrl + '/createpost', productObj);
  }

  addCategory(value: any) {
    let obj = {
      categoryName: value,
    };
    return this.httpClient.post(this.apiUrl + '/addcategoryname', obj, {
      responseType: 'text',
    });
  }


  //testing

 



  getAllCategory() {
    return this.httpClient.get(this.apiUrl + '/getallcategory');
  }

  getCategoryByName(category: any): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.apiUrl + `/category/${category}`).pipe(
      tap((categoryData) => {
        this.passCategory(categoryData);
      })
    );
  }

  myPosts(): Observable<Category> {
    return this.httpClient.get<Category>(this.apiUrl + '/userposts');
  }

  views(id: number) {
    const body = {};
    return this.httpClient.put(this.apiUrl + `/countviews/${id}`, body);
  }

  editPost(postId: number) {
    this.router.navigate(['/editpost/', postId]);
  }

  editPost2(id: number, obj: any) {
    let editPayload = {
      Category: obj.Category,
      Title: obj.Title,
      ProductImage: obj.FileName,
      Price: obj.Price,
      Status: obj.Status,
      Description: obj.Description,
      Address: obj.Address,
    };
    return this.httpClient.post(this.apiUrl + `/editpost/${id}`, editPayload, {
      responseType: 'text',
    });
  }
}
