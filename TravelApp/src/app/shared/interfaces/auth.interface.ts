export interface IUserInfo {
    email: string;
    password: string;
    reEnterPassword?:string;
  }
  
  export interface IToken {
    token: string;
  }

  export interface IRegisterResponse{
    token: string;
    id:number;
  }