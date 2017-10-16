import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService,
    private userSercice: UserService
  ) { }

  canActivate(): Observable<boolean> {
    return this.auth.user$
      .switchMap(user => this.userSercice.get(user.uid))
      .map(appUser => appUser.isAdmin);
  }

}
