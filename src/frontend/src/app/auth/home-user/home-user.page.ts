import { Component, OnInit } from '@angular/core';
import { Node } from 'src/app/model/nodes';
import { NodesService } from 'src/app/services/nodes.service';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.page.html',
  styleUrls: ['./home-user.page.scss'],
})
export class HomeUserPage implements OnInit {
  listadoNodes: Node[];
  constructor(public nodeService: NodesService) {
    nodeService.getListadoNodes().then((lst) => {
      this.listadoNodes = lst;
      console.log(lst);
    });
  }

  ngOnInit() {}
}
