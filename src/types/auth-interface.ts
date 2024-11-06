export interface AuthReducerInfo {
  isLogin: boolean;
}

export interface AuthInfo {
  email: string;
  name?: string;
  password?: string;
  passwordCheck?: string;
}
