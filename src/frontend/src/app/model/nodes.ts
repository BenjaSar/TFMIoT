export class Node {
  private _idnodes: number;
  private _namenodes: string;

  constructor(idnodes: number, namenodes: string) {
    this._idnodes = idnodes;
    this._namenodes = namenodes;
  }

  public get namenodes(): string {
    return this._namenodes;
  }
  public set namenodes(value: string) {
    this._namenodes = value;
  }

  public get idnodes(): number {
    return this._idnodes;
  }

  public set idnodes(value: number) {
    this._idnodes = value;
  }
}
