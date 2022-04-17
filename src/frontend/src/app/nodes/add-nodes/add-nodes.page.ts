import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Node } from '../../model/nodes';
import { NodesService } from '../../services/nodes.service';

@Component({
  selector: 'app-add-nodes',
  templateUrl: './add-nodes.page.html',
  styleUrls: ['./add-nodes.page.scss'],
})
export class AddNodesPage implements OnInit {
  public configurationForm: FormGroup;
  isSubmitted = false;

  constructor(
    public configBuilder: FormBuilder,
    public alertCtrl: AlertController,
    private rNode: NodesService
  ) {}

  ngOnInit() {
    this.createNode();
    this.configForm();
    this.registerNode();
  }
  private createNode() {
    this.configurationForm = this.configBuilder.group({
      idnodes: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^-?(0|[1-9]\d*)?$/),
          Validators.minLength(1),
          Validators.maxLength(5),
        ]),
      ],
      namenodes: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[a-zA-Z]*'),
          Validators.minLength(5),
          Validators.maxLength(25),
        ]),
      ],
    });
  }

  configForm() {
    this.isSubmitted = true;
    if (!this.configurationForm.valid) {
      console.log('Por favor proporcione los campos requeridos');
      return false;
    } else {
      this.registerNode();
    }
  }

  get errorControl() {
    return this.configurationForm.controls;
  }

  registerNode() {
    const idNodes = this.configurationForm.get('idnodes').value;
    const namenodes = this.configurationForm.get('namenodes').value;

    if (idNodes != '' && namenodes != '') {
      let nodes: Node = new Node(idNodes, namenodes);

      this.rNode.createNode(nodes).then((nodo) => {
        console.log(nodo);
      });
    }
  }

  async showAlertConfig() {
    const alert = this.alertCtrl.create({
      header: 'Registro exitoso!',
      message: 'El nodo fue registrado con éxito!',
      buttons: ['OK'],
    });
    (await alert).present();
  }
}
