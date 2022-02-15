import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sensor } from '../model/sensor';
import { SensorsService } from '../services/sensors.service';
@Component({
  selector: 'app-nodes',
  templateUrl: './nodes.page.html',
  styleUrls: ['./nodes.page.scss'],
})
export class NodesPage implements OnInit {
  idnodes: string;
  show = true;
  listSensors: Sensor[];

  constructor(
    public sensorService: SensorsService,
    private router: ActivatedRoute
  ) {
    sensorService.getSensorList().subscribe({
      next: (lst) => {
        this.listSensors = lst;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('Tarea ejecutada');
      },
    });

    setTimeout(() => {
      this.show = false;
    }, 2500);
  }

  ngOnInit() {
    this.idnodes = this.router.snapshot.paramMap.get('id');
  }
}
