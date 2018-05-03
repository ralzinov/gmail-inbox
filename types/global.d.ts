/* Global definitions for developement */

// for style loader
declare module '*.css' {
  const styles: any;
  export = styles;
}

declare type AccountInfo = chrome.identity.AccountInfo;
declare type LastError = chrome.runtime.LastError;
