export interface IUserInfo {
    email: string;
    password: string;
  }
  
  export interface IToken {
    token: string;
  }

  export interface IRegisterResponse{
    token: string;
    id:number;
  }