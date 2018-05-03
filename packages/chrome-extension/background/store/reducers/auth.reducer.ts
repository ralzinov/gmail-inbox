import {IActionWithPayload} from '../actions';
import {SET_ACCESS_TOKEN, SET_ACCESS_TOKEN_STATUS} from '../constants';

export interface IAuthState {
    token?: string;
    tokenStatus?: string;
}

export function AuthReducer(state: IAuthState = {}, action: IActionWithPayload<string>): IAuthState {
    switch (action.type) {
        case SET_ACCESS_TOKEN_STATUS:
            return {...state, tokenStatus: action.payload};
        case SET_ACCESS_TOKEN:
            return {...state, token: action.payload};
        default:
            return state;
    }
}
