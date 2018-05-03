export interface IFeedEntryText {
    text: string;
}

export interface IAccountFeedEntry {
    title: IFeedEntryText;
    sumary: IFeedEntryText;
    link: {
        attributes: {
            rel: string;
            href: string;
            type: string;
        }
    };
    modified: IFeedEntryText;
    issued: IFeedEntryText;
    id: IFeedEntryText;
    author: {
        name: IFeedEntryText;
        email: IFeedEntryText;
    };
}
