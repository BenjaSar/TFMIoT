import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sensor } from '../model/sensor';
import { Router } from '@angular/router';
import { SensorsService } from '../services/sensors.service';
import { UsersService } from '../services/users.service';
import { Users } from '../model/users';
@Component({
  selector: 'app-nodes',
  templateUrl: './nodes.page.html',
  styleUrls: ['./nodes.page.scss'],
})
export class NodesPage implements OnInit {
  idnodes: string;
  show = true;
  listSensors: Sensor[];
  device: Sensor;

  constructor(
    public sensorService: SensorsService,
    private _routerN: ActivatedRoute,
    private _router: Router
  ) {
    setTimeout(() => {
      this.show = false;
    }, 2500);
  }

  ngOnInit() {
    this.idnodes = this._routerN.snapshot.paramMap.get('id');
    this.getSensorList();
  }

  getSensorList() {
    this.sensorService.getSensorList().subscribe({
      next: (lst) => {
        this.listSensors = lst;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {},
    });
  }

  //TODO: Hacer página añadir sensores
  addSensors() {
    console.log('Página para añadir sensor');
  }
}
