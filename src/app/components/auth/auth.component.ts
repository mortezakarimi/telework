import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {faGoogle} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  public loginForm: FormGroup;
  public errorMessage: string;
  public successMessage: string;
  faGoogle = faGoogle;
  public isRegister: boolean;

  constructor(private fb: FormBuilder, public authService: AuthService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.isRegister = data.registration;
      this.loginForm = this.fb.group({
        email: [''],
        password: ['']
      });
    });
  }

  tryAuth(value) {
    if (this.isRegister) {
      this.tryRegister(value);
    } else {
      this.tryLogin(value);
    }
  }

  private tryLogin(value) {
    this.authService.doEmailLogin(value)
      .then(res => {
        this.errorMessage = '';
        this.successMessage = 'Your are logged in!';
        this.router.navigate(['/']);
      }, err => {
        this.errorMessage = err.message;
        this.successMessage = '';
      });
  }

  googleLogin() {
    this.authService.doGoogleLogin()
      .then(res => {
        this.errorMessage = '';
        this.successMessage = 'Your are logged in!';
        return this.router.navigate(['/']);
      }, err => {
        this.errorMessage = err.message;
        this.successMessage = '';
      });
  }


  private tryRegister(value) {
    this.authService.doRegister(value)
      .then(res => {
        this.errorMessage = '';
        this.successMessage = 'Your account has been created';
        return this.router.navigate(['/']);
      }, err => {
        this.errorMessage = err.message;
        this.successMessage = '';
      });
  }
}
