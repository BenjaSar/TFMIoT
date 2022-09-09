/*
Author:FS
# Date: 2022
# Embedded Systems Laboratory FIUBA
# License: MIT
#################################################################################
*/

import {
  Component,
  ContentChild,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Temperature } from '../model/temperature';
import { TemperaturesService } from '../services/temperatures.service';
import { Chart, ChartType } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { ActivatedRoute } from '@angular/router';
Chart.register(zoomPlugin);

@Component({
  selector: 'app-temperatures',
  templateUrl: './temperatures.page.html',
  styleUrls: ['./temperatures.page.scss'],
})
export class TemperaturesPage implements OnInit {
  @ViewChild('lineCanvas') private lineCanvas: ElementRef;
  lineChart: Chart;
  listTemp: Temperature[];
  datos: any = [];
  label: any = [];
  id: string;

  sub;
  constructor(
    public tService: TemperaturesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getTemperature();
    this.getLabels();
  }

  lineChartMethod() {
    const labels = this.label[0].labels;
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        //labels: this.label[0].labels,
        labels: labels,
        datasets: [
          {
            label: 'Temperature',
            fill: false,
            tension: 0.3,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.datos[0]['Temp'],
            spanGaps: false,
          },
        ],
      },
      options: {
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        scales: {
          x: {
            display: true,
            title: { display: true, text: 'Time', color: 'blue' },
            ticks: {
              maxTicksLimit: labels.length / 5,
              /*callback: function (value) {
                // Hide every 2nd tick label
                //return index % 2 === 0 ? this.getLabelForValue(val) : '';
                //if (!(index % 4)) return val;
                return this.getLabelForValue(value).substring(0, 6);
              },*/
            },
          },
          y: {
            display: true,
            title: { display: true, text: 'ºC', color: 'blue' },
          },
        },
        plugins: {
          zoom: {
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true,
              },
              mode: 'xy',
            },
          },
        },
      },
    });
    if (this.lineChart.data.datasets[0].data[0] > 120) {
      this.lineChart.data.datasets[0].borderColor = 'red';
      this.lineChart.update();
    }
  }

  getTemperature() {
    let idsensors = this.route.snapshot.paramMap.get('id');
    this.tService.getTemperatureListByIdSensor(idsensors).subscribe({
      next: (response) => {
        this.listTemp = response;
        this.datos.push({
          Temp: response.map((Temperature) => Temperature.temperature),
        });
      },
      error: (error) => {
        console.log(error);
      },

      complete: () => console.log('Estos son los datos', this.datos[0]['Temp']),
    });
  }

  getLabels() {
    let idsensors = this.route.snapshot.paramMap.get('id');
    console.log(idsensors);
    this.tService.getTemperatureListByIdSensor(idsensors).subscribe(
      (response) => {
        this.listTemp = response;
        this.label.push({
          labels: response.map((Temperature) => Temperature.datestime),
        });
        this.lineChartMethod();
        console.log('Estas son las labels,', this.label[0]['labels']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
