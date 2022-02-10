import { Component, OnInit } from '@angular/core';
import { Node } from '../model/nodes';
import { NodesService } from '../services/nodes.service';

@Component({
  selector: 'app-nodes',
  templateUrl: './nodes.page.html',
  styleUrls: ['./nodes.page.scss'],
})
export class NodesPage implements OnInit {
  listadoNodes: Node[];
  show = true;
  constructor(public nodeService: NodesService) {
    nodeService.getListadoNodes().then((lst) => {
      this.listadoNodes = lst;
      console.log(lst);
    });
    setTimeout(() => {
      this.show = false;
    }, 2500);
  }

  ngOnInit() {}
}
