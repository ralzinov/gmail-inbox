import * as React from 'react';
import {ReactNode} from 'react';
import {IHeader} from './interfaces';
import * as style from './Header.css';

import {ActionsPanel} from '../../containers';

export class Header extends React.Component<IHeader.Props, IHeader.State> {
    render(): ReactNode {
        return (
            <div className={style.header}>
                <ActionsPanel />
            </div>
        );
    }
}
