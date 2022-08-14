import { Component, OnInit } from '@angular/core';
import { Node } from 'src/app/model/nodes';
import { NodesService } from 'src/app/services/nodes.service';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { Users } from '../../model/users';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.page.html',
  styleUrls: ['./home-user.page.scss'],
})
export class HomeUserPage implements OnInit {
  listadoNodes: Node[];
  user: Users;
  idUser: string;
  constructor(
    public nodeService: NodesService,
    public uServices: UsersService,
    public alertController: AlertController,
    private _routerU: ActivatedRoute,
    private _router: Router,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.idUser = this._routerU.snapshot.paramMap.get('id');
    console.log('Este es mi id', this.idUser);

    nodeService.getListadoNodes().then((lst) => {
      this.listadoNodes = lst;
      console.log(lst);
    });

    //this.initializeApp();
  }

  ngOnInit() {
    this.getUser();
    this.addNodes();
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Salir de la app!',
      message: 'Confirmas que quieres <strong>salir de la app</strong>?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: () => {
            this._router.navigate(['/home-user']);
          },
        },
        {
          text: 'Ok',
          id: 'confirm-button',
          role: 'destructive',
          handler: () => {
            console.log('Confirm Ok');
          },
        },
      ],
    });

    await alert.present();
  }

  getUser() {
    this.uServices.getUserById(this.idUser).then((u) => {
      this.user = u;
      console.log('Este es mi usuario', u);
    });
  }

  //TODO: Hacer página añadir nodos
  addNodes() {
    console.log('Página para añadir nodo');
    this._router.navigateByUrl('/add-nodes');
  }

  /*initializeApp() {
    this.platform.ready().then(() => {
      // let status bar overlay webview
      this.statusBar.overlaysWebView(true);
      // set status bar to white
      this.statusBar.backgroundColorByHexString('#ffffff');

      this.splashScreen.show();
    });
  }*/
}
