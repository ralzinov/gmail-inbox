export {Root as InboxUI} from './src/components/Root';

export namespace IInputUI {
    export type Subscriber = (data: IInputUI.Data) => void;

    export interface Data {

    }

    export interface Pipe {
        subscribe: (subscriber: IInputUI.Subscriber) => void;
    }
}
