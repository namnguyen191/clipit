export interface IUserData {
  name: string;
  email: string;
  age: number;
  phoneNumber: string;
  uuid?: string;
}

export interface IRegisterUserData extends IUserData {
  password: string;
}
