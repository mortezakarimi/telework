import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public errorMessage: string;
  public successMessage: string;
  public registerForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  tryRegister(value) {
    this.authService.doRegister(value)
      .then(res => {
        console.log(res);
        this.errorMessage = '';
        this.successMessage = 'Your account has been created';
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = '';
      });
  }

}
