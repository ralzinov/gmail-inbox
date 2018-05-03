import * as React from 'react';
import {ReactNode} from 'react';
import {IPagination} from './interfaces';
import {ActionButton, ButtonsGroup, Icon, ICONS} from '../../components';
import * as style from './Pagination.css';

export class Pagination extends React.Component<IPagination.Props, IPagination.State> {
    clickHandler = (action: string) => (): void => {
        console.log(action);
    }

    getPaginationText(): React.ReactNode {
        const pageStart = 12;
        const pageSize = 50;
        const totalMessages = 325;

        return (
            <span className={style.paginationText}>
                <b>{pageStart}</b>–<b>{pageStart + pageSize}</b> of <b>{totalMessages}</b>
            </span>
        );
    }

    render(): ReactNode {
        return (
            <div className={style.pagination}>
                {this.getPaginationText()}
                <ButtonsGroup>
                    <ActionButton onClick={this.clickHandler('prev')}>
                        <Icon type={ICONS.PREV_PAGE}/>
                    </ActionButton>
                    <ActionButton onClick={this.clickHandler('next')}>
                        <Icon type={ICONS.NEXT_PAGE}/>
                    </ActionButton>
                </ButtonsGroup>
            </div>
        );
    }
}
