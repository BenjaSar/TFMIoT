import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddNodesPageRoutingModule } from './add-nodes-routing.module';

import { AddNodesPage } from './add-nodes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddNodesPageRoutingModule,
  ],
  declarations: [AddNodesPage],
})
export class AddNodesPageModule {}
