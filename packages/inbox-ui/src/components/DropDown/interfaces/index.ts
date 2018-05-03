export namespace IDropDown {
    export interface Option {
        label?: string;
        action?: string;
        className?: string;
        selected?: boolean;
        divider?: boolean;
        header?: boolean;
        tip?: boolean;
    }

    export interface Props {
        className?: string;
        onSelect: (e: Option) => void;
        options: Option[];
    }
    export interface State {
        opened: boolean;
        direction?: string;
    }
}
