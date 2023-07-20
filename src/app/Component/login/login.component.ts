import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { LoginModel } from 'src/app/_model/login-param-model';
import { AuthenticationService } from 'src/app/_share/services/authentication.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: LoginModel = new LoginModel();
  submitted = false;
  returnUrl: string = '/login';
  errorMessage: string = '';


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private zone: NgZone
  ) { }

  ngOnInit(): void {
    this.authenticationService.isLoggedIn.subscribe(data => {
      if (data) {
        this.router.navigate(['/home']);
      }
    });
  }

onSubmit(){
 
  this.submitted = true;
console.log("loginForm",this.loginForm)
  this.authenticationService.login(this.loginForm.Username, this.loginForm.PassWord)
      .pipe(first())
      .subscribe(data => {
        if (data.flag) {
          this.router.navigate(['/home']);
        }
        else {
          this.errorMessage = data.msg;
        }
      });
}
  localIp(value: any, value1: any, localIp: any) {
    throw new Error('Method not implemented.');
  }
}
