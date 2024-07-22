import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Shopify';
  constructor(private router: Router) {}

  showHeader(): boolean {
    const currentRoute = this.router.url;
    return !currentRoute.includes('login') && !currentRoute.includes('signup');
  }

 
}
