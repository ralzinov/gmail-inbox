import * as _ from 'lodash';
import * as React from 'react';
import {ReactNode} from 'react';
import {IDropDown} from './interfaces';
import * as cx from 'classnames';
import * as style from './DropDown.css';

import {ActionButton} from '../ActionButton';
import {ClickOutside} from '../ClickOutside';

const LEFT_DIRECTION = 'left';
const RIGHT_DIRECTION = 'right';

export class DropDown extends React.Component<IDropDown.Props, IDropDown.State> {
    list: Element;
    container: Element;

    handleResize =  _.debounce(() => this.setDirection(), 100);

    constructor(props: IDropDown.Props) {
        super(props);
        this.state = {
            opened: false
        };
    }

    getClassName(): string {
        const {className} = this.props;
        const {opened} = this.state;

        return cx({
            [style.dropDown]: true,
            [style.buttonActive]: opened,
            [className]: !!className
        });
    }

    setContainer(ref: Element): void {
        this.container = ref;
    }

    setList(ref: Element): void {
        this.list = ref;
    }

    setDirection(): void {
        if (!this.container || !this.list) {
            return void 0;
        }

        const containerRect = this.container.getBoundingClientRect();
        const pageRect = document.body.getBoundingClientRect();
        const listRect = this.list.getBoundingClientRect();
        const freeSpace = pageRect.width - (containerRect.left + listRect.width);
        const direction = (freeSpace > 0) ? LEFT_DIRECTION : RIGHT_DIRECTION;

        if (this.state.direction !== direction) {
            this.setState({direction});
        }
    }

    handleButtonClick(): void {
        this.setState({opened: !this.state.opened});
    }

    handleClickOutside(): void {
        this.setState({opened: false});
    }

    renderList(): ReactNode {
        const {options, onSelect} = this.props;
        const listItems = options.map((option, index) => {
            if (option.divider) {
                return <li key={`option_${index}`} className={style.listDivider}></li>;
            }
            const className = cx({
                [option.className]: !!option.className,
                [style.listItemSelected]: option.selected,
                [style.listHeader]: option.header,
                [style.listItemTip]: option.tip,
                [style.listItem]: true,
            });

            const clickHandler = () => {
                this.setState({opened: false});
                onSelect(option);
            };

            return (
                <li
                    key={`option_${index}`}
                    onClick={option.action && clickHandler}
                    className={className}
                >
                    <span>{option.label}</span>
                </li>
            );
        });

        return (
            <ul
                ref={(el) => this.setList(el)}
                style={{[this.state.direction]: 0}}
                className={style.list }
            >
                {...listItems}
            </ul>
        );
    }

    componentDidMount(): void {
        window.addEventListener('resize', this.handleResize, true);
    }

    componentWillUnmount(): void {
        window.removeEventListener('resize', this.handleResize, true);
    }

    componentDidUpdate(): void {
        this.setDirection();
    }

    render(): ReactNode {
        const {children} = this.props;
        const {opened} = this.state;

        return (
            <ClickOutside onClick={() => this.handleClickOutside()}>
                <div ref={(el) => this.setContainer(el)} className={this.getClassName()}>
                    <ActionButton onClick={() => this.handleButtonClick()}>
                        {children}
                        <div className={style.arrowDown}/>
                    </ActionButton>
                    {opened && this.renderList()}
                </div>
            </ClickOutside>
        );
    }
}
