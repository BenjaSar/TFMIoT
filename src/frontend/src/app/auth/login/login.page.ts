import { Component, ContentChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;
  isSubmitted = false;
  showPassword = false;
  @ContentChild(IonInput) input: IonInput;

  constructor(public fBuilder: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.loginForm = this.fBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  submitForm() {
    this.isSubmitted = true;
    if (!this.loginForm.valid) {
      console.log('Por favor proporcione los campos requeridos');
      return false;
    } else {
      console.log(this.loginForm.value);
    }
  }

  get errorControl() {
    return this.loginForm.controls;
  }

  toggleShow() {
    this.showPassword = !this.showPassword;
    this.input.type = this.showPassword ? 'text' : 'password';
  }
}
