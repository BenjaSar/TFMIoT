import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Temperature } from '../model/temperature';
import { TemperaturesService } from '../services/temperatures.service';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.page.html',
  styleUrls: ['./sensors.page.scss'],
})
export class SensorsPage implements OnInit {
  public idSensor;
  listTemp: Temperature[];
  constructor(
    private routerS: ActivatedRoute,
    public tService: TemperaturesService
  ) {
    tService.getTemperatureListByIdSensor().subscribe({
      next: (T) => {
        this.listTemp = T;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => console.log(this.listTemp),
    });
  }

  ngOnInit() {
    this.idSensor = parseInt(this.routerS.snapshot.paramMap.get('id'));
    /*this.tService.getTemperatureListByIdSensor().subscribe({
      next: (T) => {
        this.listTemp = T;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => console.log(this.listTemp),
    });*/
  }
}
