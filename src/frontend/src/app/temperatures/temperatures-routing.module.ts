import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TemperaturesPage } from './temperatures.page';

const routes: Routes = [
  {
    path: '',
    component: TemperaturesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemperaturesPageRoutingModule {}
