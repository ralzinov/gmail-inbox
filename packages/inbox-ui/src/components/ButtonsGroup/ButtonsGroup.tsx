import * as React from 'react';
import * as cx from 'classnames';
import {IButtonsGroup} from './interfaces';
import * as style from './ButtonsGroup.css';

export class ButtonsGroup extends React.Component<IButtonsGroup.Props, IButtonsGroup.State> {
    render(): React.ReactNode {
        const className = cx({
            [style.buttonsGroup]: true,
            [this.props.className]: !!this.props.className
        });

        return (
            <div className={className}>
                {this.props.children}
            </div>
        );
    }
}
