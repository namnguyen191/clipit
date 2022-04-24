export interface IUserData {
  name: string;
  email: string;
  age: number;
  phoneNumber: number;
}

export interface IRegisterUserData extends IUserData {
  password: string;
}
