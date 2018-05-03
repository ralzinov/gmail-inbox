export namespace IRowsSelector {
    export interface Props {
        rowsLength: number;
        selectedLength: number;
    }
    export interface State {
        checked: boolean;
        partial: boolean;
    }
}
