import {Background} from './background';
import {rootReducer, configureStore, IAppState} from './store';

const store = configureStore<IAppState>(rootReducer, {});
const APP = new Background(store);

chrome.runtime.onConnect.addListener((port) => {
    port.onMessage.addListener((msg: { getData: boolean }) => {
        if (msg.getData) {
            port.postMessage({
                state: store.getState()
            });
        }
    });

    port.onDisconnect.addListener(store.subscribe(() => {
        port.postMessage({
            state: store.getState()
        });
    }));
});
