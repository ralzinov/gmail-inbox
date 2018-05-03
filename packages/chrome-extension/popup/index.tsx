import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {IInputUI, InboxUI} from 'gmail-inbox-ui';
import {PipeService} from '../pipe-service';
import './popup.css';

const pipe = new PipeService();

ReactDOM.render(<InboxUI pipe={pipe} />, document.getElementById('root'));
