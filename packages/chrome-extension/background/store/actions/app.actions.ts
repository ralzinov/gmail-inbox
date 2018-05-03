import {
    INIT_APP
} from '../constants';
import {Action} from 'redux';

export type IAppAction = InitApp;

export class InitApp implements Action {
    type = INIT_APP;
}

