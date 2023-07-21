import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, map } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { UserSessionModel } from "src/app/_model/user-session-model";
import { environment } from "src/environments/environment";
@Injectable({
    providedIn:'root'
})
export class AuthenticationService {
    private loggedIn= new BehaviorSubject<boolean>(false);
    private currentUserSubject: BehaviorSubject<UserSessionModel>;
    public currentUser: Observable<UserSessionModel>=
    (new BehaviorSubject<UserSessionModel>(JSON.parse('{"flag": false}'))).asObservable();
    constructor(
        private router:Router,
        private http:HttpClient
    ){
        this.currentUserSubject= new BehaviorSubject<UserSessionModel>(
            JSON.parse(localStorage.getItem('currentUser')|| '{"flag":false}')
        );
        this.currentUser= this.currentUserSubject.asObservable();
        this.loggedIn.next(JSON.parse(localStorage.getItem('currentUser')|| '{"flag": false}').flag||false)
    }
    public get isLoggedIn(){
        return this.loggedIn.asObservable();
    }
    public get userValue():UserSessionModel{
        return this.currentUserSubject.value;
    }
    login(username:string,password:string){
        return this.http.post<any>(`${environment.apiBaseUrl}login`,{Username:username,Password:password})
        .pipe(map(user=>{
            if (user.flag) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                this.loggedIn.next(user.flag);
    
                this.startRefreshTokenTimer();
              }
              return user;
        }))
    }
    logout(){
       // this.router.navigate(['/login']);
        this.stopRefreshTokenTimer();
        localStorage.removeItem('currentUser');
        this.loggedIn.next(false);
        this.currentUserSubject.next({
            flag:false,
            value:undefined,
            msg:''
        });
    }
   refreshToken(){
    return this.http.post<any>(`${environment.apiBaseUrl}refresh-token`,{})
    .pipe(map((user :any)=>{
        localStorage.setItem('curentUser',JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.startRefreshTokenTimer();
        return user;
    }));
   }
   private refreshTokenTimeout:any;
   private startRefreshTokenTimer(){
    let TokenString='';
    if(this.userValue.value!=undefined && this.userValue.value.token !=''){
        console.log(this.userValue)
        TokenString = this.userValue.value?.token.split('.')[1];

        // parse json object from base64 encoded jwt token
        const jwtToken = JSON.parse(atob(TokenString));

        // set a timeout to refresh the token a minute before it expires
        const expires = new Date(jwtToken.exp * 1000);
        const timeout = expires.getTime() - Date.now() - (60 * 1000);

        this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
    }
   }
   private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}