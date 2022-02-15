export class Sensor {
  private _idsensors: number;
  private _sensors: string;

  constructor(idsensors: number, sensors: string) {
    this._idsensors = idsensors;
    this._sensors = sensors;
  }

  public get idsensors(): number {
    return this._idsensors;
  }

  public set idsensors(value: number) {
    this._idsensors = value;
  }

  public get sensors(): string {
    return this._sensors;
  }

  public set sensors(value: string) {
    this._sensors = value;
  }
}
