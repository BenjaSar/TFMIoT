export class Node {
  private _Nodes: string;

  constructor(Nodes: string) {
    this._Nodes = Nodes;
  }

  public get Nodes(): string {
    return this._Nodes;
  }
  public set Nodes(value: string) {
    this._Nodes = value;
  }
}
