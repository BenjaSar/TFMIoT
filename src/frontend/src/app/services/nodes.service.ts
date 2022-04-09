import { Injectable } from '@angular/core';
import { Node } from '../model/nodes';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NodesService {
  urlApi = 'http://localhost:5000/api/v1/';
  constructor(private _http: HttpClient) {}
  getListadoNodes(): Promise<Node[]> {
    return this._http
      .get(this.urlApi + 'nodes/')
      .toPromise()
      .then((listado: Node[]) => {
        return listado;
      });
  }

  getNodebyId(id): Promise<Node> {
    return this._http
      .get(this.urlApi + 'nodes/' + id)
      .toPromise()
      .then((node: Node) => {
        return node;
      });
  }

  async createNode(node: Node) {
    return await this._http
      .post(this.urlApi + 'nodes/create', {
        idNodes: node.idnodes,
        namenodes: node.namenodes,
      })
      .toPromise()
      .then((node: Node) => {
        return node;
      });
  }
}
