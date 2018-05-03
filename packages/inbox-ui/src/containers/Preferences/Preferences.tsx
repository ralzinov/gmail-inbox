import * as React from 'react';
import {ReactNode} from 'react';
import {IPreferences} from './interfaces';
import {DropDown, Icon, ICONS, IDropDown} from '../../components';
import * as style from './Preferences.css';

const MENU_HEADER = {
    header: true,
    label: 'Accounts:'
};

const NO_ACCOUNTS_PLACEHOLDER = {
    tip: true,
    label: 'No active accounts'
};

const STATIC_OPTIONS = [{
    action: 'show-login',
    label: 'Login into another account'
}, {
    divider: true
}, {
    action: 'unread-only-mode',
    label: 'Show unread only',
    selected: true
}, {
    divider: true
}, {
    action: 'show-settings',
    label: 'Settings'
}];

export class Preferences extends React.Component<IPreferences.Props, IPreferences.State> {
    handleSelect = ({action}: IDropDown.Option): void => {
        console.log(action);
        // call select rows action
    }

    getAccounts(): IDropDown.Option[] {
        return [NO_ACCOUNTS_PLACEHOLDER];
    }

    getMenuOptions(): IDropDown.Option[] {
        return [
            MENU_HEADER,
            ...this.getAccounts(),
            ...STATIC_OPTIONS
        ];
    }

    render(): ReactNode {
        return (
            <DropDown
                className={style.menu}
                options={this.getMenuOptions()}
                onSelect={this.handleSelect}
            >
                <Icon type={ICONS.SETTINGS}/>
            </DropDown>
        );
    }
}
