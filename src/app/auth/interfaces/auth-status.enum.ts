export enum AuthStatus {
  // * if we leave it without the values, then deffect enumeration will assign each proeprty a value from 0-2. if you where to change the order then afterwards, this will mess up your app.
  checking = 'checking',
  authenticated = 'Authenticated',
  notAuthenticated = 'notAuthenticated',
}
