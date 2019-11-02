import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FirebaseService} from '../../firebase.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  loginForm: FormGroup;
  data: Array<any>;
  user: any;
  constructor(public authService: AuthService,
              public fb: FormBuilder,
              private fireService: FirebaseService
  ) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get loginFormControls() {
    return this.loginForm.value;
  }

  submit() {
    // this.fireService.getUsers().subscribe(value => {
    //   value.map(item => {
    //     this.data = item.payload.doc.data();
    //     console.log(this.data);
    //   });
    // });
    this.authService.SignIn(this.loginFormControls.email, this.loginFormControls.password);
    this.authService.loggedUser = this.loginFormControls;
  }
}
