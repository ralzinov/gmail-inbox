import {Effect} from './utils';
import {SetAccounts} from '../actions';
import {GET_ACCOUNTS} from '../constants';

const GMAIL_COOKIE_NAME = 'GMAIL_AT';

export const GetAccountsIndexEffect = Effect(GET_ACCOUNTS, (store) => {
    chrome.cookies.getAll({
        name: GMAIL_COOKIE_NAME
    }, (cookies) => {
        const users = cookies.map((cookie) => {
            return cookie.path.match(/\/mail\/u\/([0-9]+)/)[1];
        });
        store.dispatch(new SetAccounts(users));
    });
});

export const accountEffects = [
    GetAccountsIndexEffect,
];
