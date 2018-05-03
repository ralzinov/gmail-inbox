export namespace ICheckbox {
    export interface Props {
        onClick: (checked: boolean) => void;
        checked: boolean;
        partial?: boolean;
        type?: string;
    }
    export interface State {
        checked?: boolean;
        partial?: boolean;
    }
}
