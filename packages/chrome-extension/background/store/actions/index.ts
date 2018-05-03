import {Action} from 'redux';

export * from './app.actions';
export * from './auth.actions';
export * from './accounts.actions';

export interface IAction extends Action {
    type: string;
}

export interface IActionWithPayload<T> extends Action {
    type: string;
    payload: T;
}
