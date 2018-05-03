import {createLogger} from 'redux-logger';
import {createStore, applyMiddleware, Store, Reducer, MiddlewareAPI, Dispatch, Action} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {effects} from './effects';
import {IAppState} from './reducers';

export * from './actions';
export * from './reducers';
export * from './constants';

const logger = createLogger({
    collapsed: true
});

export const isDevelopment = (): boolean => {
    return process.env.NODE_ENV === 'development';
};

const actionsTransformer = (api: MiddlewareAPI<IAppState>) => (next: Dispatch<IAppState>) => (action: any): any => {
    next(Object.assign({}, action));
};

const effectsRunner = (api: MiddlewareAPI<IAppState>) => (next: Dispatch<IAppState>) => (action: any): any => {
    effects.forEach((effect) => {
        effect(api, action);
    });
    next(action);
};

export function configureStore<T>(rootReducer: Reducer<T>, initialState?: T): Store<T> {
    let middleware = applyMiddleware(logger, actionsTransformer, effectsRunner);
    if (isDevelopment()) {
        middleware = composeWithDevTools(
            applyMiddleware(logger, actionsTransformer, effectsRunner)
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
