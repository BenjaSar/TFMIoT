import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Temperature } from '../model/temperature';
import { TemperaturesService } from '../services/temperatures.service';
import * as Highcharts from 'highcharts';
import * as moment from 'moment';
import { Chart } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { SensorsService } from '../services/sensors.service';
import { Sensor } from '../model/sensor';
Chart.register(zoomPlugin);

declare var require: any;
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.page.html',
  styleUrls: ['./sensors.page.scss'],
})
export class SensorsPage implements OnInit {
  @ViewChild('lineCanvas') private lineCanvas: ElementRef;

  lineChart: Chart;
  public myChart;
  private _chartOptions;
  datos: any = [];
  label: any = [];
  idsensors: string;
  idtemperatures: string;
  temperatura: Temperature;
  listTemp: Temperature[];
  listSensors: Sensor[];

  constructor(
    private _routerS: ActivatedRoute,
    public tService: TemperaturesService,
    public sService: SensorsService
  ) {
    this.idsensors = this._routerS.snapshot.paramMap.get('id');
    /*setTimeout(() => {
      //llamo al update del chart para refrescar y mostrar el nuevo valor
      this.myChart.update({
        series: [
          {
            name: 'C',
            data: this.temperatura[0]['temperature'],
            tooltip: {
              valueSuffix: 'C',
            },
          },
        ],
      });
    }, 6000);*/
  }

  ngOnInit() {
    this.getData();
  }

  ionViewDidEnter() {
    this.generarChart();
  }

  generarChart() {
    this._chartOptions = {
      chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false,
      },
      title: {
        text: 'Sensor',
      },

      credits: { enabled: false },

      pane: {
        startAngle: -150,
        endAngle: 150,
        background: [
          {
            backgroundColor: {
              linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
              stops: [
                [0, '#FFF'],
                [1, '#333'],
              ],
            },
            borderWidth: 0,
            outerRadius: '109%',
          },
          {
            backgroundColor: {
              linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
              stops: [
                [0, '#333'],
                [1, '#FFF'],
              ],
            },
            borderWidth: 1,
            outerRadius: '107%',
          },
          {
            // default background
          },
          {
            backgroundColor: '#DDD',
            borderWidth: 0,
            outerRadius: '105%',
            innerRadius: '103%',
          },
        ],
      },
      // the value axis
      yAxis: {
        min: 0,
        max: 10,

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
          step: 2,
          rotation: 'auto',
        },
        title: {
          text: 'C',
        },
        plotBands: [
          {
            from: 50,
            to: 100,
            color: '#55BF3B', // green
          },
          {
            from: 100,
            to: 150,
            color: '#DDDF0D', // yellow
          },
          {
            from: 150,
            to: 200,
            color: '#DF5353', // red
          },
        ],
      },
      series: [
        {
          name: 'ºC',
          data: [this.temperatura[0]['temperature']],
          tooltip: {
            valueSuffix: ' ºC',
          },
        },
      ],
    };
    this.myChart = Highcharts.chart('highcharts', this._chartOptions);
  }

  ionViewWillEnter() {
    this.getData();
  }

  getSensorList() {
    this.sService.getSensorList().subscribe({
      next: (lst) => {
        this.listSensors = lst;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {},
    });
  }
  getData() {
    console.log(this.idsensors);
    this.tService.getTemperatureByIdSensor(this.idsensors).subscribe({
      next: (response) => {
        this.temperatura = response;
        this.generarChart();
      },
      error: (error) => {
        console.log(error);
      },
      complete: () =>
        console.log('Estos son los datos', this.temperatura[0]['temperature']),
    });
  }
}
