import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FirebaseService} from '../../services/firebase/firebase.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(public authService: AuthService,
              public fb: FormBuilder,
              public fireService: FirebaseService,
              private route: Router) {
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNum: ['', Validators.required],
      host: [false]
    });
  }

  get registerFormControls() {
    return this.registerForm.value;
  }

  submit() {
    this.authService.SignUp(this.registerFormControls.email, this.registerFormControls.password).then(() => {
      this.fireService.createUser(this.registerFormControls);
      window.alert('Thanks for Registering, Sign In Now');
      this.route.navigate(['sign-in']);
    }).catch(val => {
      window.alert(val);
    });
  }

}

