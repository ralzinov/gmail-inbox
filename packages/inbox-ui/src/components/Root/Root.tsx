import * as React from 'react';
import {ReactNode} from 'react';
import {IRoot} from './interfaces';
import {Header, Content} from '../index';
import * as style from './Root.css';

export class Root extends React.Component<IRoot.Props, IRoot.State> {

    componentWillMount(): void {
        this.props.pipe.subscribe((state) => {
            console.log('UI %o', state);
        });
    }

    render(): ReactNode {
        return (
            <div className={style.root}>
                <Header />
                <Content />
            </div>
        );
    }
}
