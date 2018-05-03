import {IInputUI} from 'gmail-inbox-ui';
import {IAppState} from '../background/store/reducers';
import Port = chrome.runtime.Port;

export interface IPortMSG {
    state: IAppState;
}

export const PIPE_SERVICE_PORT_NAME = 'popup-pipe-serice';

export class PipeService implements IInputUI.Pipe {
    private subscribers: IInputUI.Subscriber[] = [];
    private port: Port;

    constructor() {
        this.openPort();
        this.port.postMessage({getData: true});
    }

    subscribe(fn: IInputUI.Subscriber): void {
        this.subscribers.push(fn);
    }

    private next(data: IInputUI.Data): void {
        this.subscribers.forEach((fn) => fn(data));
    }

    private openPort(): void {
        this.port = chrome.runtime.connect({name: PIPE_SERVICE_PORT_NAME});
        this.port.onMessage.addListener((msg: IPortMSG) => {
            this.handlePortMSG(msg);
        });
    }

    private handlePortMSG(msg: {[p: string]: any}): void {
        if (msg.state) {
            this.next(msg.state);
        }
    }
}
