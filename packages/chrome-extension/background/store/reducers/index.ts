import {combineReducers} from 'redux';
import {AuthReducer, IAuthState} from './auth.reducer';
import {AccountsReducer, IAccountsState} from './accounts';

export * from './auth.reducer';
export * from './accounts';

export interface IAppState {
    auth?: IAuthState;
    accounts?: IAccountsState;
}

export const rootReducer = combineReducers<IAppState>({
    auth: AuthReducer,
    accounts: AccountsReducer
});
