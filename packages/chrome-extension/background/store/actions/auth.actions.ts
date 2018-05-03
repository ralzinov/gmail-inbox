import {
    GET_ACCESS_TOKEN,
    SET_ACCESS_TOKEN,
    CLEAR_AUTH_TOKEN,
    SET_ACCESS_TOKEN_STATUS
} from '../constants';
import {Action} from 'redux';


export class GetAccessToken implements Action {
    type = GET_ACCESS_TOKEN;
    constructor(
        public payload: boolean
    ) {}
}

export class SetAccessToken implements Action {
    type = SET_ACCESS_TOKEN;
    constructor(
        public payload: string
    ) {}
}

export class SetAccessTokenStatus implements Action {
    type = SET_ACCESS_TOKEN_STATUS;
    constructor(
        public payload: string
    ) {}
}

export class ClearAuthToken implements Action {
    type = CLEAR_AUTH_TOKEN;
    constructor(
        public payload: string
    ) {}
}
