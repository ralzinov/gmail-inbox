import {
    SET_ACCOUNTS,
    GET_ACCOUNTS,
    SET_ACCOUNT_FEED, SET_ACCOUNT_STATUS,
} from '../constants';
import {Action} from 'redux';
import {IAccountFeedEntry} from '../reducers';

export class GetAccounts implements Action {
    type = GET_ACCOUNTS;
}

export class SetAccounts implements Action {
    type = SET_ACCOUNTS;
    constructor(
        public payload: string[]
    ) {}
}

export class SetAccountFeed implements Action {
    type = SET_ACCOUNT_FEED;
    constructor(
        public payload: {
            accountId: string,
            email: string,
            feed: IAccountFeedEntry[]
        }
    ) {}
}

export class SetAccountStatus implements Action {
    type = SET_ACCOUNT_STATUS;
    constructor(
        public payload: {
            accountId: string,
            status: number
        }
    ) {}
}

export type IAccountAction
    = SetAccountFeed
    | SetAccountStatus
    | SetAccounts;
