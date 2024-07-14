import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
class ValidationsService {

  constructor(private router: Router) {}

  idValidation(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): UrlTree | boolean {
    const id = parseInt(next.params['id'], 0);
    return isNaN(id) ? this.router.createUrlTree(['document']) : true;
  }
}

export const IdValidationGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): UrlTree | boolean => {
  return inject(ValidationsService).idValidation(next, state);
}
