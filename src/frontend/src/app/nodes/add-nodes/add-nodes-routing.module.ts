import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNodesPage } from './add-nodes.page';

const routes: Routes = [
  {
    path: '',
    component: AddNodesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddNodesPageRoutingModule {}
