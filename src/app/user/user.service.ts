import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of, Subject, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

interface User {
  id: string;
  photo_url: string;
}

interface AccessToken {
  access_token: string;
}

interface TgInfos {
  auth_date: number;
  hash: string;
  photo_url: string;
  id: string;
  first_name?: string;
  username?: string;
}

@Injectable({
  providedIn: "root",
})
export class UserService {
  userSub = new Subject<string>();

  isLogin: boolean;

  constructor(private http: HttpClient) {}

  validateToken(accessToken: string): void {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });
    this.http
      .get("http://localhost:3030/auth/login", { headers })
      .pipe(
        catchError((err) => {
          console.log(`Problème d'authentification : ${err}`);
          return throwError(err);
        })
      )
      .subscribe(
        (res: User) => {
          this.setItem("TG_id", res.id);
          this.setItem("photo_url", res.photo_url);
          console.log(res);
          this.isLogin = true;
        },
        (err) => {
          console.log("HTTP Error", err);
        },
        () => {
          console.log("HTTP request completed");
        }
      );
  }

  login(tgInfos): void {
    this.http
      .post<AccessToken>("http://localhost:3030/auth/login", tgInfos)
      .pipe(
        catchError((err) => {
          console.log(`Problème d'authentification : ${err}`);
          return throwError(err);
        })
      )
      .subscribe((res) => {
        this.setItem("jwtToken", res.access_token);
        this.setItem("image", tgInfos.photo_url);
        this.setItem("id", tgInfos.id);
        this.setItem("pseudo", tgInfos.name);
        this.isLogin = true;
      });
  }

  logout(): void {
    localStorage.clear();
    this.userSub.next("changed");
    this.isLogin = false;
  }

  watchUser(): Observable<any> {
    return this.userSub.asObservable();
  }

  setItem(key: string, data: any): void {
    localStorage.setItem(key, data);
    this.userSub.next("changed");
  }

  removeItem(key): void {
    localStorage.removeItem(key);
    this.userSub.next("changed");
  }
}
