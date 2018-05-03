import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Root} from './components/Root';
import {IInputUI} from '../index';

// import {Provider} from 'react-redux';
// import {configureStore} from './store';
// const store = configureStore();

class MockPipe implements IInputUI.Pipe {
    private subscribers: IInputUI.Subscriber[] = [];

    subscribe(subscriber: IInputUI.Subscriber): void {
        this.subscribers.push(subscriber);
    }

    next(data: IInputUI.Data): void {
        this.subscribers.forEach((fn) => fn(data));
    }
}

ReactDOM.render(<Root pipe={new MockPipe()}/>, document.getElementById('root'));
