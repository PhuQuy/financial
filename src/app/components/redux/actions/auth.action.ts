import { Action } from '@ngrx/store';

export const LOGIN = '[Auth] Login';
export const GETUSER = '[Auth] GetUser';
export const LOGOUT = '[Auth] Logout';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_FAILURE = '[Auth] Login Failure';
export const CONFIGURATION = '[Configuration] Configuration';
export const CONFIGURATION_LOAD_SUCCESS = '[Configuration] Configuration Success';
export const CONFIGURATION_LOAD_FAILED = '[Configuration] Configuration Failed';

export class Login implements Action {
    readonly type = LOGIN;
    constructor(public payload: any) { }
}

export class Configuration implements Action {
    readonly type = CONFIGURATION;
    constructor() { }
}

export class ConfigurationSuccess implements Action {
    readonly type = CONFIGURATION_LOAD_SUCCESS;
    constructor(public payload: any) { }
}

export class ConfigurationFailed implements Action {
    readonly type = CONFIGURATION_LOAD_FAILED;
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

export type AllConfiguration = Configuration | ConfigurationSuccess | ConfigurationFailed