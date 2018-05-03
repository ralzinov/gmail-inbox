import {Store} from 'redux';
import {AuthService, AccountService, BrowserActionService} from './services';
import {IAppState, AccountsIndexSelector} from './store/reducers';
import {InitApp} from './store/actions';


export class Background {
    accountWatchers: AccountService[] = [];

    constructor(private store: Store<IAppState>) {
        this.setListeners();
        BrowserActionService.init(store);
        this.store.dispatch(new InitApp());
    }

    watchAuthStatus = (account: AccountInfo, signedIn: boolean): void => {
        console.log(`User with id ${account.id} signed ${signedIn ? 'in' : 'out'}.`);
        // dispatch event
    }

    handleError = ({message}: LastError): void => {
        console.log(`Unhandled error: "${message}"`);
        // dispatch event
    }

    private onChanges(state: IAppState): void {
        const accountsIndex = AccountsIndexSelector(state);
        if (this.accountWatchers.length !== accountsIndex.length) {
            this.initAccountWatchers(accountsIndex);
        }
    }

    private initAccountWatchers(accountsIndex: string[]): void {
        this.accountWatchers = accountsIndex.map((userId: string) => {
            return new AccountService(this.store, userId);
        });
        this.accountWatchers.forEach((service) => service.onInit());
    }

    private setListeners(): void {
        AuthService.onSignInChanged(this.watchAuthStatus);
        this.store.subscribe(() => {
            const state = this.store.getState();
            this.onChanges(state);
        });
    }
}
