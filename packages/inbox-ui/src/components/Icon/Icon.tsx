import * as React from 'react';
import {ReactNode} from 'react';
import {IIcon} from './interfaces';
import * as cx from 'classnames';
import * as style from './Icon.css';

export const ICONS = {
    REFRESH: style.refresh,
    SETTINGS: style.settings,
    NAV_BACK: style.navBack,
    ARCHIVE: style.archive,
    REPORT: style.report,
    DELETE: style.delete,
    PREV_PAGE: style.prevPage,
    NEXT_PAGE: style.nextPage,
};

export class Icon extends React.Component<IIcon.Props, IIcon.State> {
    getClassName(): string {
        const {className, type} = this.props;
        return cx({
            [type]: !!type,
            [style.icon]: true,
            [className]: !!className
        });
    }

    render(): ReactNode {
        return (
            <div className={this.getClassName()} />
        );
    }
}
