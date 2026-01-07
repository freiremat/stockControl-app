import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthRequest } from 'src/app/models/interfaces/user/AuthRequest';
import { SignUpUserRequest } from 'src/app/models/interfaces/user/SignUpUserRequest';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loginCard = true;

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  signupForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(private formBuilder: FormBuilder, private userService: UserService, private cookieService: CookieService) { }

  ngOnInit() {
  }

  onSubmitLoginForm(): void {
    if (this.loginForm.value && this.loginForm.valid) {
      this.userService.authUser(this.loginForm.value as AuthRequest)
        .subscribe({
          next: (response) => {
            if (response) {
              this.cookieService.set('USER_INFO', response?.token)

              this.loginForm.reset();
            }
          },
          error: (err) => console.log(err),
        })
    }
  }

  onSubmitSignUpForm(): void {
    if (this.signupForm.value && this.signupForm.valid) {
      this.userService
        .signupUser(this.signupForm.value as SignUpUserRequest)
        .subscribe({
          next: (response) => {
            if (response) {
              alert('usuario criado com sucesso');
              this.signupForm.reset();
              this.loginCard = true;
            }
          },
          error: (err) => console.log(err),
        });
    }
  }
}
