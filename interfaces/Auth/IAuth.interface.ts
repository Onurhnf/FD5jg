export namespace IAuth {
  export interface IFormData {
    name?: string;
    email: string;
    password: string;
  }
  export interface Action_register {
    email: string;
    id: number;
    name: string;
    created_at: string;
  }

  export interface IAuthRegisterResponse {
    action_register: Action_register;
  }

  export interface Action_login {
    message: string;
    token: string;
  }

  export interface IAuthLoginResponse {
    action_login: Action_login;
  }
}
