import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SensorsPageRoutingModule } from './sensors-routing.module';
import { NgChartsModule } from 'ng2-charts';
import { SensorsPage } from './sensors.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SensorsPageRoutingModule,
    NgChartsModule,
  ],
  declarations: [SensorsPage],
})
export class SensorsPageModule {}
