import {Store} from 'redux';
import {IAppState} from '../store/reducers';
import {createSelector} from 'reselect';

export class BrowserActionService {
    private static store: Store<IAppState>;

    private prevBadgeText: string;

    static init(store: Store<IAppState>): void {
        this.store = store;
        this.store.subscribe(() => {
            const state = this.store.getState();

        });
    }

    static setBadge(): void {
        chrome.browserAction.setBadgeText({text: '9'});
    }
}

