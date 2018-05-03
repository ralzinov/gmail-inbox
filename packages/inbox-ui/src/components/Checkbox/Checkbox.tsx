import * as React from 'react';
import {MouseEvent, ReactNode} from 'react';
import {ICheckbox} from './interfaces';
import * as cx from 'classnames';
import * as style from './Checkbox.css';

export class Checkbox extends React.Component<ICheckbox.Props, ICheckbox.State> {
    static TYPES = {
        STAR: style.star,
        TAG: style.tag,
    };

    constructor(props: ICheckbox.Props) {
        super(props);
        this.state = {
            checked: props.checked,
            partial: !!props.partial
        };
    }

    componentWillReceiveProps({checked, partial}: ICheckbox.Props): void {
        let newState: ICheckbox.State;

        if (this.state.checked !== checked) {
            newState = {checked};
        }

        if (this.state.partial !== !!partial) {
            newState = newState || {};
            newState.partial = partial;
        }

        if (newState) {
            this.setState(newState);
        }
    }

    getClassName(): string {
        const {partial, checked} = this.state;
        return cx({
            [style.checkbox]: true,
            [this.props.type || style.default]: true,
            [style.checked]: checked && !partial,
            [style.partial]: partial
        });
    }

    handleClick(e: MouseEvent<any>): void {
        e.stopPropagation();
        const {onClick, partial} = this.props;
        let checked = partial ? false : !this.state.checked;
        onClick(checked);
        this.setState({
            checked: checked,
            partial: false
        });
    }

    render(): ReactNode {
        return (
            <div
                role="checkbox"
                className={this.getClassName()}
                onClick={(e) => this.handleClick(e)}
            />
        );
    }
}
