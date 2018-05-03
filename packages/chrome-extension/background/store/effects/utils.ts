import {MiddlewareAPI} from 'redux';
import {IAppState} from '../reducers';
import {IActionWithPayload} from '../actions';

export const Effect = (type: string, handler: (store: MiddlewareAPI<IAppState>, action: IActionWithPayload<any>) => void) => {
    return (api: MiddlewareAPI<IAppState>, action: IActionWithPayload<any>) => {
        if (action.type === type) {
            handler(api, action);
        }
    };
};
