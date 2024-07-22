import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

export const authGuard:
CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  let router = inject(Router)
  let token= localStorage.getItem('mytoken');
  return token ? true:router.navigate(['/login']);


};