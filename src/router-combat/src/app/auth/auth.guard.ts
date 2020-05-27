import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  /**
   * ctor
   * @param router 路由
   */
  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // 判断是否有 token 信息
    let token = localStorage.getItem('auth-token');
    if (token === '') {
      this.router.navigate(['/login']);
      return false;
    }

    // 判断是否可以访问当前连接
    let url: string = state.url;
    if (token.indexOf('admin') !== -1 && url.indexOf('/crisis-center') !== -1) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let token = localStorage.getItem('auth-token');
    if (token === '') {
      this.router.navigate(['/login']);
      return false;
    }

    return token === 'admin-master';
  }
}