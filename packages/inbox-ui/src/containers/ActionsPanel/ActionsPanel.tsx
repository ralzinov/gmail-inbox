import * as React from 'react';
import {ReactNode} from 'react';
import {IActionsPanel} from './interfaces';
import * as style from './ActionsPanel.css';
import {ActionButton, ButtonsGroup, Icon, ICONS} from '../../components';
import {RowsSelector, Pagination, ExtraActions, Preferences} from '../index';

export class ActionsPanel extends React.Component<IActionsPanel.Props, IActionsPanel.State> {

    handleClick(e?: any): void {
        console.log(e);
    }

    showRefreshButton(): boolean {
        return false;
    }

    showPagination(): boolean {
        return true;
    }

    showNavBackButton(): boolean {
        return false;
    }

    renderActionsGroup(): ReactNode {
        return (
            <ButtonsGroup>
                <ActionButton onClick={() => this.handleClick('archive')}><Icon type={ICONS.ARCHIVE} /></ActionButton>
                <ActionButton onClick={() => this.handleClick('report')}><Icon type={ICONS.REPORT} /></ActionButton>
                <ActionButton onClick={() => this.handleClick('delete')}><Icon type={ICONS.DELETE} /></ActionButton>
            </ButtonsGroup>
        );
    }

    renderRefreshButton(): ReactNode {
        return (
            <ActionButton onClick={() => this.handleClick('refresh')}>
                <Icon type={ICONS.REFRESH}/>
            </ActionButton>
        );
    }

    renderRowsSelector(): ReactNode {
        return (
            <RowsSelector
                rowsLength={50}
                selectedLength={1}
            />
        );
    }

    renderNavBackbutton(): ReactNode {
        return (
            <ActionButton onClick={() => this.handleClick('nav-back')}>
                <Icon type={ICONS.NAV_BACK}/>
            </ActionButton>
        );
    }

    render(): ReactNode {
        return (
            <div className={style.container}>
                {
                    this.showNavBackButton()
                        ? this.renderNavBackbutton()
                        : this.renderRowsSelector()
                }
                {
                    this.showRefreshButton()
                        ? this.renderRefreshButton()
                        : this.renderActionsGroup()
                }
                <ExtraActions anySelected={true}/>
                <div className={style.spacer}/>
                {
                    this.showPagination() && <Pagination />
                }
                <Preferences />
            </div>
        );
    }
}
