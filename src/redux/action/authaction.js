/* eslint-disable prettier/prettier */
// actions.js
import { LoginSuccessfull, LogoutSuccessfull } from '../constant';

export const loginSuccess = (user) => ({
  type: LoginSuccessfull,
  payload: {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    // Add other necessary user properties here
  },
});

export const logoutSuccess = () => ({
  type: LogoutSuccessfull,
});
