import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TemperaturesPageRoutingModule } from './temperatures-routing.module';

import { TemperaturesPage } from './temperatures.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TemperaturesPageRoutingModule
  ],
  declarations: [TemperaturesPage]
})
export class TemperaturesPageModule {}
