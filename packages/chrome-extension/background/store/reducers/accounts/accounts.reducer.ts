import {createSelector} from 'reselect';
import {IAccountAction, SetAccountFeed, SetAccounts, SetAccountStatus} from '../../actions';
import {SET_ACCOUNT_FEED, SET_ACCOUNT_STATUS, SET_ACCOUNTS, ACCOUNT_STATUS} from '../../constants';
import {IAccount} from './interfaces';
import {IAppState} from '../index';

export interface IAccountsState {
    index: string[];
    data: {
        [accountId: string]: IAccount;
    };
}

const initialState = {
    index: <string[]>[],
    data: <{[address: string]: IAccount}>{}
};

export function AccountsReducer(state: IAccountsState = initialState, action: IAccountAction): IAccountsState {
    let payload: IAccountAction['payload'];
    switch (action.type) {
        case SET_ACCOUNT_FEED:
            payload = (<SetAccountFeed>action).payload;
            return {
                ...state,
                data: {
                    ...state.data,
                    [payload.accountId]: {
                        status: ACCOUNT_STATUS.OK,
                        feed: payload.feed,
                        email: payload.email
                    }
                }
            };
        case SET_ACCOUNT_STATUS:
            payload = (<SetAccountStatus>action).payload;
            return {
                ...state,
                data: {
                    ...state.data,
                    [payload.accountId]: {
                        ...state.data[payload.accountId],
                        status: payload.status,
                    }
                }
            };
        case SET_ACCOUNTS:
            return {
                ...state,
                index: (<SetAccounts>action).payload
            };
        default:
            return state;
    }
}

export const AccountsIndexSelector = createSelector((state: IAppState) => state.accounts.index, (index) => index);
