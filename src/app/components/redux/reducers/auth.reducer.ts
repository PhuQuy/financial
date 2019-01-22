import * as StateActions from '../actions/auth.action';
import { User } from '../models/user.model';

export type Action = StateActions.All;

export interface State {
    // is a user authenticated?
    isAuthenticated: boolean;
    // if authenticated, there should be a user object
    user: User | null;
    // error message
    errorMessage: string | null;
    language: string | null;
    userProfile: User | {};
}

export const initialState: State = {
    isAuthenticated: false,
    user: null,
    errorMessage: null,
    language: null,
    userProfile: {}
};

export function reducer(state = initialState, action: StateActions.All): any {
    switch (action.type) {
        case StateActions.LOGIN:
            return { ...state, isAuthenticated: false };
        case StateActions.LOGIN_SUCCESS:
            return {
                ...state, isAuthenticated: true,
                user: {
                    ...action.payload
                }
            };
        case StateActions.LOGIN_FAILURE:
            return { ...state, isAuthenticated: false };
        case StateActions.LOGOUT:
            return { ...state, isAuthenticated: false };

        default:
            return state;
    }


}