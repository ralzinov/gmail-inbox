import {IAccountFeedEntry} from './IAccountFeedEntry';

export interface IAccount {
    status: number;
    email: string;
    feed: IAccountFeedEntry[];
}
