import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;

   signinForm: FormGroup;
   returnUrl: string;
    constructor(private formBuilder:FormBuilder, private authService: AuthService, private route: ActivatedRoute, private router: Router){
      this.signinForm = this.formBuilder.group({
        username: [null, Validators.required],
        password: [null, Validators.required]
      });
      this.returnUrl = '/';
   }

  ngOnInit() {
    this.signinForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get form() { return this.signinForm!.controls; }

  onSubmit() {
    this.authService.loginUser(this.form['username'].value, this.form['password'].value)
    .subscribe(
      {
        error: (err) => {console.log(err);},
        complete: () => {},
        next: (data) => {this.router.navigate([this.returnUrl]);}
      });
  }

}
