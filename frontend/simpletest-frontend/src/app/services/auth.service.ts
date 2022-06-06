import { IStoredUser } from './../interfaces/storeduser.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
import { IToken } from './../interfaces/token.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public backendUrl = environment.backend_url;
  private loggedUserSubject: BehaviorSubject<String|null>; // TODO - implement User interface
  public loggedInUser: Observable<any>;

  constructor(private httpClient: HttpClient) {
    const getLoggedUser = JSON.parse(localStorage.getItem('loggedInUser') as string);
    this.loggedUserSubject = new BehaviorSubject<String|null>(getLoggedUser);
    this.loggedInUser = this.loggedUserSubject.asObservable();
   }

   loginUser(username: string, password: string) {
     return this.httpClient.post<any>(this.backendUrl + '/login', { username: username, password: password })
        .pipe(map(response => {
          localStorage.setItem('loggedInUser', JSON.stringify(response));
          this.loggedUserSubject.next(response);
          return response;
        }));
   }

   logoutUser(){
      localStorage.removeItem('loggedInUser');
      this.loggedUserSubject.next(null);
   }

   public get loggedInUserValue(): String|null {
     return this.loggedUserSubject.value;
   }

   public get loggedInUserName(): string|null {
     const localStorageUser = JSON.parse(localStorage.getItem('loggedInUser') as string) as IStoredUser;
     return localStorageUser.username;
   }

   public isAuthenticated(): boolean {
     const localStorageUser = JSON.parse(localStorage.getItem('loggedInUser') as string) as IStoredUser;
     if (localStorageUser) {
        try{
          const decoded = jwt_decode(localStorageUser.token) as IToken;
          const tokenIsValid = decoded.exp > Math.floor(Date.now() / 1000);
          if(tokenIsValid){
            return true;
          }
        }catch(err){
          console.log(err);
          this.logoutUser();
          return false;
        }
     }
     this.logoutUser();
     return false;
   }

}
