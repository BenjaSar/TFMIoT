import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
} from '@angular/forms';
import { AlertController, IonInput } from '@ionic/angular';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  public registrationForm: FormGroup;
  isSubmitted = false;

  constructor(
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController
  ) {}
  ngOnInit() {
    this.createSignUp();
  }

  private createSignUp() {
    this.registrationForm = this.formBuilder.group({
      nombre: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[a-zA-Z]*'),
          Validators.minLength(5),
          Validators.maxLength(30),
        ]),
      ],
      apellido: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[a-zA-Z]*'),
          Validators.minLength(5),
          Validators.maxLength(30),
        ]),
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmarPassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  validatePassword() {
    return (
      this.registrationForm.get('password').value !=
      this.registrationForm.get('confirmarPassword').value
    );
  }

  signUpForm() {
    this.isSubmitted = true;

    if (!this.registrationForm.valid && !this.validatePassword()) {
      console.log(this.validatePassword());
      console.log('Por favor proporcione los campos requeridos');
      return false;
    } else {
      console.log(this.registrationForm.value);
    }
  }

  get errorControl() {
    return this.registrationForm.controls;
  }

  async showAlert() {
    const alert = this.alertCtrl.create({
      header: 'Registro exitoso!',
      message: 'El usuario fue registrado con éxito!',
      buttons: ['OK'],
    });
    (await alert).present();
  }
}
