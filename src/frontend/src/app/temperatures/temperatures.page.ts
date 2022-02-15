import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-temperatures',
  templateUrl: './temperatures.page.html',
  styleUrls: ['./temperatures.page.scss'],
})
export class TemperaturesPage implements OnInit {
  idTemperature: string;

  constructor(private routerT: ActivatedRoute) {}

  ngOnInit() {
    this.idTemperature = this.routerT.snapshot.paramMap.get('id');
  }
}
