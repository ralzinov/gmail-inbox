import * as React from 'react';
import {ReactNode} from 'react';
import {IActionButton} from './interfaces';
import * as cx from 'classnames';
import * as style from './ActionButton.css';

export class ActionButton extends React.Component<IActionButton.Props, IActionButton.State> {
    getClassName(): string {
        const {className} = this.props;
        return cx({
            [style.actionButton]: true,
            [className]: !!className
        });
    }

    render(): ReactNode {
        const {children, onClick} = this.props;
        return (
            <button
                className={this.getClassName()}
                onClick={(e) => onClick(e)}
            >
                {children}
            </button>
        );
    }
}
