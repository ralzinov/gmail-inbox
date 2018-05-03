import * as React from 'react';
import {ReactNode} from 'react';
import * as cx from 'classnames';
import {IListRow} from './interfaces';
import {Checkbox} from '../../components';
import * as style from './ListRow.css';

export class ListRow extends React.Component<IListRow.Props, IListRow.State> {
    handleClick = (): void => {
        // emit view-message action
        console.log('view-message');
    }

    handleCheck = (): void => {
        // emit select-message acion
        console.log('select-message');
    }

    markAsStarred = (): void => {
        // emit star-message action
        console.log('star-message');
    }

    markAsImportant = (): void => {
        // emit mark-as-important action
        console.log('mark-as-important');
    }

    getDate(): string {
        const date = new Date(this.props.data.date).toString().split(' ');
        return `${date[1]} ${date[2]}`;
    }

    getRowClassName(): string {
        const {selected, unread} = this.props.data;
        return cx({
            [style.row]: true,
            [style.rowSelected]: selected,
            [style.rowUnread]: unread && !selected,
            [style.rowBold]: unread
        });
    }

    render(): ReactNode {
        const {data: {selected, title, text, important, sender, starred}} = this.props;
        return (
            <div className={this.getRowClassName()} onClick={this.handleClick}>
                <div className={style.checkbox}>
                    <Checkbox checked={selected} onClick={this.handleCheck}/>
                </div>
                <div className={style.star}>
                    <Checkbox type={Checkbox.TYPES.STAR} onClick={this.markAsStarred} checked={starred}/>
                </div>
                <div className={style.important}>
                    <Checkbox type={Checkbox.TYPES.TAG} onClick={this.markAsImportant} checked={important}/>
                </div>
                <div className={style.sender}>{sender}</div>
                <div className={style.title}>
                    <span>{title}</span><span className={style.text}>{text}</span>
                </div>
                <div className={style.date}>{this.getDate()}</div>
            </div>
        );
    }
}
