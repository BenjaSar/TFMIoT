import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
} from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { UsersService } from '../../services/users.service';
import { Users } from '../../model/users';

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
    public alertCtrl: AlertController,
    private rUser: UsersService
  ) {}
  ngOnInit() {
    this.createSignUp();
    this.signUpForm();
    this.registerUser();
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
      posicion: [
        '',
        Validators.compose([
          Validators.required,
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
      console.log(
        'Estos son los valores proporcionados',
        JSON.stringify(this.registrationForm.value)
      );
      this.registerUser();
    }
  }

  get errorControl() {
    return this.registrationForm.controls;
  }

  registerUser() {
    const usersName = this.registrationForm.get('nombre').value;
    const usersSurname = this.registrationForm.get('apellido').value;
    const userPosition = this.registrationForm.get('posicion').value;
    const usersEmail = this.registrationForm.get('email').value;
    const usersPasswords = this.registrationForm.get('password').value;
    const usersConfirmPasswords =
      this.registrationForm.get('confirmarPassword').value;

    let user: Users = new Users(
      usersName,
      usersSurname,
      userPosition,
      usersEmail,
      usersPasswords,
      usersConfirmPasswords
    );
    this.rUser.addUsers(user).then((usuario) => {
      console.log(usuario);
    });
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
