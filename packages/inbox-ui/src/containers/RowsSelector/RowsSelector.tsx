import * as React from 'react';
import {ReactNode} from 'react';
import {IRowsSelector} from './interfaces';
import {DropDown, IDropDown, Checkbox} from '../../components';

const DROPDOWN_OPTIONS = [{
    action: 'all',
    label: 'All'
}, {
    action: 'none',
    label: 'None',
}, {
    action: 'read',
    label: 'Read',
}, {
    action: 'unread',
    label: 'Unread'
}];

export class RowsSelector extends React.Component<IRowsSelector.Props, IRowsSelector.State> {
    constructor(props: IRowsSelector.Props) {
        super(props);

        this.state = {
            partial: this.isCheckedPartial(),
            checked: this.isChecked()
        };
    }

    handleCheck = (checked: boolean): void => {
        this.setState({
            partial: false,
            checked
        });

        if (checked) {
            // call "select all" action
        } else {
            // call "select none" action
        }
    }

    handleSelect = ({action}: IDropDown.Option): void => {
        console.log(action);
        // call select rows action
    }

    render(): ReactNode {
        return (
            <DropDown
                options={DROPDOWN_OPTIONS}
                onSelect={this.handleSelect}
            >
                <Checkbox
                    checked={this.state.checked}
                    partial={this.state.partial}
                    onClick={this.handleCheck}
                />
            </DropDown>
        );
    }

    private isChecked(): boolean {
        const {rowsLength, selectedLength} = this.props;
        return rowsLength === selectedLength;
    }

    private isCheckedPartial(): boolean {
        const {rowsLength, selectedLength} = this.props;
        return (rowsLength > 0) && rowsLength !== selectedLength;
    }
}
