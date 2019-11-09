import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FirebaseService} from '../../services/firebase/firebase.service';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css']
})
export class HostComponent implements OnInit {
  hostRegisterForm: FormGroup;

  constructor(private fb: FormBuilder,
              private fireService: FirebaseService,
              private authService: AuthService,
              private route: Router) {
  }

  ngOnInit() {
    this.hostRegisterForm = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      place: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      host: [true]
    });
  }

  get registerFormControls() {
    return this.hostRegisterForm.value;
  }

  submit() {
    this.authService.SignUp(this.registerFormControls.email, this.registerFormControls.password).then(() => {
      this.fireService.createHost(this.registerFormControls);
      this.route.navigate(['sign-in']);
    }).catch(val => {
      window.alert(val);
    });

  }
}
