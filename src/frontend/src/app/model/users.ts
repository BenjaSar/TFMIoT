export class Users {
  private _usersName: string;
  private _usersSurname: string;
  private _userPosition: string;
  private _usersEmail: string;
  private _usersPasswords: string;
  private _usersConfirmPasswords: string;

  constructor(
    usersName,
    usersSurname,
    userPosition,
    usersEmail,
    usersPasswords,
    usersConfirmPasswords
  ) {
    this._usersName = usersName;
    this._usersSurname = usersSurname;
    this._userPosition = userPosition;
    this._usersEmail = usersEmail;
    this._usersPasswords = usersPasswords;
    this._usersConfirmPasswords = usersConfirmPasswords;
  }

  //Getters and setters
  public get usersName(): string {
    return this._usersName;
  }
  public set usersName(value: string) {
    this._usersName = value;
  }

  public get usersSurname(): string {
    return this._usersSurname;
  }
  public set usersSurname(value: string) {
    this._usersSurname = value;
  }

  public get userPosition(): string {
    return this._userPosition;
  }
  public set userPosition(value: string) {
    this._userPosition = value;
  }

  public get usersEmail(): string {
    return this._usersEmail;
  }
  public set usersEmail(value: string) {
    this._usersEmail = value;
  }

  public get usersPasswords(): string {
    return this._usersPasswords;
  }
  public set usersPasswords(value: string) {
    this._usersPasswords = value;
  }

  public get usersConfirmPasswords(): string {
    return this._usersConfirmPasswords;
  }
  public set usersConfirmPasswords(value: string) {
    this._usersConfirmPasswords = value;
  }
}
