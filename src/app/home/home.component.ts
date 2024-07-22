import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ServiceService } from '../Services/service.service';
import { Post } from '../classes&interfaces/post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {


isHovered: boolean = false;
constructor(private router: Router) { }

handleImageClick(event: MouseEvent) {
  const image = event.target as HTMLImageElement;
  const imageWidth = image.offsetWidth;
  const imageHeight = image.offsetHeight;

  const offsetX = event.offsetX;
  const offsetY = event.offsetY;

  const middleX = imageWidth / 2;
  const middleY = imageHeight / 3;

  const threshold =42;

  if (Math.abs(offsetX - middleX) <= threshold && Math.abs(offsetY - middleY) <= threshold) {
    this.router.navigate(['/category/Automobile']);
  }
}
onMouseEnter() {
  this.isHovered = true;
}

onMouseLeave() {
  this.isHovered = false;
}
 
}
