import {Effect} from './utils';
import {INIT_APP} from '../constants';
import {GetAccounts} from '../actions';

const InitAppEffect = Effect(INIT_APP, (store) => {
    store.dispatch(new GetAccounts());

});

export const appEffects = [
    InitAppEffect
];
