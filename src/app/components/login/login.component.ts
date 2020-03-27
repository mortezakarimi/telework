import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public errorMessage: string;
  public successMessage: string;

  constructor(private fb: FormBuilder, public authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }


  tryLogin(value) {
    this.authService.doEmailLogin(value)
      .then(res => {
        console.log(res);
        this.errorMessage = '';
        this.successMessage = 'Your are logged in!';
        this.router.navigate(['/']);
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = '';
      });
  }

  googleLogin() {
    this.authService.doGoogleLogin()
      .then(res => {
        console.log(res);
        this.errorMessage = '';
        this.successMessage = 'Your are logged in!';
        this.router.navigate(['/']);
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = '';
      });
  }
}
