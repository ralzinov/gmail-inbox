import * as React from 'react';
import {ReactNode} from 'react';
import {IExtraActions} from './interfaces';
import {DropDown, IDropDown} from '../../components';
import * as style from './ExtraActions.css';

const ALL_OPTIONS = [{
    action: 'mark-unread',
    label: 'Mark as unread'
}, {
    action: 'mark-important',
    label: 'Mark as important',
}];

const NONE_SELECTED_OPTIONS = [{
    action: 'all-read',
    label: 'Mark all as read'
}, {
    divider: true
}, {
    label: 'Select messages to see more actions',
    tip: true
}];

export class ExtraActions extends React.Component<IExtraActions.Props, IExtraActions.State> {
    handleSelect = ({action}: IDropDown.Option): void => {
        console.log(action);
        // call select rows action
    }

    render(): ReactNode {
        return (
            <DropDown
                className={style.menu}
                options={this.props.anySelected ? ALL_OPTIONS : NONE_SELECTED_OPTIONS}
                onSelect={this.handleSelect}
            >More</DropDown>
        );
    }
}
