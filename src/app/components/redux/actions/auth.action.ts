import { Action } from '@ngrx/store';

export const LOGIN  = '[LoginState] Login';
export const LOGOUT     = '[LogoutState] Logout';

export class Login implements Action {
    readonly type = LOGIN;
  }

  export class Logout implements Action {
    readonly type = LOGOUT;
  }

  export type All = Login | Logout;