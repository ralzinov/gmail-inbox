import LastError = chrome.runtime.LastError;
import UserInfo = chrome.identity.UserInfo;
import AccountInfo = chrome.identity.AccountInfo;

export class AuthService {
    static getToken(interactive: boolean = false): Promise<string | LastError> {
        return new Promise<string>((resolve, reject) => {
            chrome.identity.getAuthToken({interactive}, (token: string): void => {
                this.apiResolver<string>(resolve, reject, token);
            });
        });
    }

    static getProfile(): Promise<UserInfo|LastError> {
        return new Promise<UserInfo>((resolve, reject) => {
            chrome.identity.getProfileUserInfo((userInfo: UserInfo) => {
                this.apiResolver<UserInfo>(resolve, reject, userInfo);
            });
        });
    }

    static removeCachedAuthToken(token: string): Promise<any> {
        return new Promise((resolve, reject) => {
            chrome.identity.removeCachedAuthToken({token}, () => {
                this.apiResolver<null>(resolve, reject, null);
            });
        });
    }

    static onSignInChanged(callback: (account: AccountInfo, signedIn: boolean) => void): void {
        chrome.identity.onSignInChanged.addListener(callback);
    }

    private static apiResolver<T>(resolve: (value: T) => void, reject: (e: LastError) => void, value: T): void {
        if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
        } else {
            resolve(value);
        }
    }
}
