import { Action } from '@ngrx/store';

export const LOGIN = '[Auth] Login';
export const GETUSER = '[Auth] GetUser';
export const LOGOUT = '[Auth] Logout';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_FAILURE = '[Auth] Login Failure';

export class Login implements Action {
    readonly type = LOGIN;
    constructor(public payload: any) { }
}

export class GetUser implements Action {
    readonly type = GETUSER;
    constructor(public payload: any) { }
}

export class LogInSuccess implements Action {
    readonly type = LOGIN_SUCCESS;
    constructor(public payload: any) { }
}

export class LogInFailure implements Action {
    readonly type = LOGIN_FAILURE;
    constructor(public payload: any) { }
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export type All = Login | Logout | LogInSuccess | LogInFailure | GetUser;