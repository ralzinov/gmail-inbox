import {appEffects} from './app.effects';
import {authEffects} from './auth.effects';
import {accountEffects} from './accounts.effects';

export const effects = [
    ...appEffects,
    ...authEffects,
    ...accountEffects
];
