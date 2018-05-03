export namespace IListRow {
    export interface Option {
        title: string;
        text: string;
        sender: string;
        selected: boolean;
        starred: boolean;
        important: boolean;
        unread: boolean;
        date: number;
    }

    export interface Props {
        data: Option;
    }
    export interface State {}
}
