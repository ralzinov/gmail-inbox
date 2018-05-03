import {Effect} from './utils';
import {SetAccessToken} from '../index';
import {AuthService} from '../../services';
import {GetAccessToken} from '../actions';
import {CLEAR_AUTH_TOKEN, GET_ACCESS_TOKEN} from '../constants';
import LastError = chrome.extension.LastError;

const AUTH_ERRORS = {
    TOKEN_NOT_GRANTED: 'OAuth2 not granted or revoked.',
    ACCES_NOT_APROWED: 'The user did not approve access.',
    INVALID_SCOPE: 'OAuth2 request failed: Service responded with error: \'invalid scope: {0}\''
};

const GetAuthTokenEffect = Effect(GET_ACCESS_TOKEN, (store, action) => {
    AuthService.getToken(action.payload)
        .then((token: string) => {
            store.dispatch(new SetAccessToken(token));
        })
        .catch(({message}: LastError) => {
            console.log(message);
            if (message === AUTH_ERRORS.TOKEN_NOT_GRANTED) {
                store.dispatch(new GetAccessToken(true));
            } else if (message === AUTH_ERRORS.ACCES_NOT_APROWED) {
                // handle error
            }

            // dispatch common error
        });
});

const ClearCachedTokenEffect = Effect(CLEAR_AUTH_TOKEN, (store) => {
    const state = store.getState();
    AuthService.removeCachedAuthToken(state.auth.token)
        .then((response) => {
            console.log(response);
            store.dispatch(new SetAccessToken(null));
        })
        .catch((e) => {
            console.error(e);
        });
});

export const authEffects = [
    GetAuthTokenEffect,
    ClearCachedTokenEffect
];
