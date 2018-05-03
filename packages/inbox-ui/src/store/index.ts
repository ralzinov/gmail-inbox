import logger from 'redux-logger';
import {createStore, applyMiddleware, Store, Reducer} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

export const isDevelopment = (): boolean => {
    return process.env.NODE_ENV === 'development';
};

export function configureStore<T>(rootReducer: Reducer<T>, initialState?: T): Store<T> {
    let middleware: any;

    if (isDevelopment()) {
        middleware = composeWithDevTools(
            applyMiddleware(logger)
        );
    }

    const store = createStore(rootReducer, initialState, middleware) as Store<T>;

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextReducer = require('./reducers');
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}
