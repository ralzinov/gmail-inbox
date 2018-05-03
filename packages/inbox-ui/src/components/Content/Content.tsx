import * as React from 'react';
import {ReactNode} from 'react';
import {IContent} from './interfaces';
import * as style from './Content.css';

import {List} from '../../containers';

export class Content extends React.Component<IContent.Props, IContent.State> {
    render(): ReactNode {
        return (
            <div className={style.content}>
                <List />
                {/*message-view*/}
                {/*settings*/}
            </div>
        );
    }
}
