import * as React from 'react';
import {ReactNode} from 'react';
import {IClickOutside} from './interfaces';
import * as style from './ClickOutside.css';

export class ClickOutside extends React.Component<IClickOutside.Props, IClickOutside.State> {
    container: Element;

    handleEvent = (e: any): void => {
        if ((e.type === 'click') && (e.type === 'touchend')) {
            return;
        }

        if (!this.container.contains(e.target)) {
            this.props.onClick();
        }
    }

    componentDidMount(): void {
        document.addEventListener('touchend', this.handleEvent, true);
        document.addEventListener('click', this.handleEvent, true);
    }

    componentWillUnmount(): void {
        document.removeEventListener('touchend', this.handleEvent, true);
        document.removeEventListener('click', this.handleEvent, true);
    }

    setContainer(ref: Element): void {
        this.container = ref;
    }

    render(): ReactNode {
        return (
            <div
                className={style.children}
                ref={(el) => this.setContainer(el)}
            >
                {this.props.children}
            </div>
        );
    }
}
