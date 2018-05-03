import * as _ from 'lodash';
import {Store} from 'redux';
import {xml2js} from 'xml-js';
import {IAppState} from '../store/reducers';
import {SetAccountFeed, SetAccountStatus} from '../store/actions';
import {IAccountFeedEntry} from '../store';
import {createSelector} from 'reselect';

const FEED_POLL_ALARM_NAME = 'getFeedPoll';
const XML_PARSE_OPTIONS = {
    compact: true,
    ignoreDeclaration: true,
    attributesKey: 'attributes',
    textKey: 'text',
};

export class AccountService {
    constructor(
        private store: Store<IAppState>,
        private userId: string
    ) {}

    onInit(): void {
        this.getFeed();
        this.setPolling();
    }

    private setPolling(): void {
        chrome.alarms.create(FEED_POLL_ALARM_NAME, {
            periodInMinutes: 1
        });
        chrome.alarms.onAlarm.addListener((e) => {
            if (e.name === FEED_POLL_ALARM_NAME) {
                this.getFeed();
            }
        });
    }

    private getFeed(): void {
        const feedUrl = `https://mail.google.com/mail/u/${this.userId}/feed/atom/`;
        fetch(feedUrl, {credentials: 'include'})
            .then((response) => {
                if (response.status !== 200) {
                    this.store.dispatch(new SetAccountStatus({
                        accountId: this.userId,
                        status: response.status
                    }));
                    throw new Error(`Unable to fetch data for account with userId: ${this.userId}. Status: ${response.status}`);
                }
                return response.text();
            })
            .then((xml: string) => xml2js(xml, XML_PARSE_OPTIONS).feed)
            .then((feed: {entry: IAccountFeedEntry[], title: {text: string}}) => {
                const email = _.last(feed.title.text.split(' '));
                this.store.dispatch(new SetAccountFeed({
                    accountId: this.userId,
                    feed: feed.entry || [],
                    email
                }));
            })
            .catch((error: any) => {
                // todo disable log in release
                console.error(error);
            });
    }
}
