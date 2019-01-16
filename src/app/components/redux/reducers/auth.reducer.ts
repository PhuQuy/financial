import * as StateActions from '../actions/auth.action';
import { User } from '../models/user.model';

export type Action = StateActions.All;

//Defaut state
const defautState: User = {
    uid: '',
    email: '',
    photoURL: '',
    displayName: '',
    favoriteColor: '',
    isLogin: false,
    error: ''
}

//Help function create new state
const newState = (state, newDate) => {
    return Object.assign({},state, newDate)
}

export function authReducer(state: User = defautState, action: Action ){
    console.log(action.type, state);

    switch(action.type){
        case StateActions.LOGIN:
            return newState(state, { isLogin: state.isLogin = true });
        
        case StateActions.LOGOUT:
            return newState(state, { isLogin: state.isLogin = false });
        
        default:
            return state;
    }

    
}