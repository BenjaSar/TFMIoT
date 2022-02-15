export class Temperature {
  private _idtemperature: number;
  private _temperature: number;
  //private _idsensors: number;
  private _datestime: Date = new Date('1900-01-01');

  constructor(idtemperature, temperature, datestime) {
    this._idtemperature = idtemperature;
    this._temperature = temperature;
    // this._idsensors = idsensors;
    this._datestime = datestime;
  }

  public get idtemperature() {
    return this._idtemperature;
  }

  public set idtemperature(value: number) {
    this._idtemperature = value;
  }

  /*public get idsensors() {
    return this._idsensors;
  }

  public set idsensors(value: number) {
    this._idsensors = value;
  }*/
  public get temperature() {
    return this._temperature;
  }

  public set temperature(value: number) {
    this._temperature = value;
  }

  public get datestime() {
    return this._datestime;
  }

  public set datestime(value: Date) {
    this._datestime = value;
  }
}
