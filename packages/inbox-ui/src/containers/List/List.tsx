import * as _ from 'lodash';
import * as React from 'react';
import {ReactNode} from 'react';
import {IList} from './interfaces';
import Scrollbars from 'react-custom-scrollbars';
import {ListRow} from '../ListRow';
import * as style from './List.css';

const getRandString = () => Math.random().toString(36).slice(2);
const getRandomData = () => ({
    selected: !!_.random(0, 1),
    unread  : !!_.random(0, 1),
    starred: !!_.random(0, 1),
    important: !!_.random(0, 1),
    sender: `${getRandString()} ${getRandString()}`,
    title: `${
        getRandString() + getRandString() + ' ' + getRandString()
    }`,
    text: `${
        getRandString() + getRandString() + ' ' + getRandString() +
        getRandString() + getRandString() + ' ' + getRandString() +
        getRandString() + ' ' + getRandString() + getRandString()
    }`,
    date: +(new Date(2018,
        _.random(0, 11),
        _.random(1, 31),
        _.random(0, 23),
        _.random(0, 59), 0, 0))
});

export class List extends React.Component<IList.Props, IList.State> {
    handleSelect = (): void => {
        // call select rows action
    }

    getRows(): ReactNode[] {
        const messages: ReactNode[] = [];
        messages.length = 50;
        messages.fill(null, 0, 50);
        return messages.map((val, index) => {
            const rowData = getRandomData();
            return <ListRow key={index} data={rowData} />;
        });
    }

    render(): ReactNode {
        return (
            <Scrollbars
                style={{height: '700px'}}
                renderThumbVertical={props => <div {...props} className={style.scrollThumb}/>}
            >
                {...this.getRows()}
            </Scrollbars>
        );
    }
}
