import { Injectable } from "@angular/core";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable, of } from "rxjs";

@Injectable()
export class CallGuard implements CanActivate {
  public constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute
  ) {}

  public canActivate(
    src: ActivatedRouteSnapshot,
    dest: RouterStateSnapshot
  ): Observable<boolean> {
    // check admin rights
    return of(true);
  }
}
