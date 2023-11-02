/* eslint-disable prettier/prettier */
// reducer.js
import { LoginSuccessfull, LogoutSuccessfull } from '../constant';

const initialState = {
  user: {},
  isLogin: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LoginSuccessfull:
      return {
        ...state,
        user: action.payload,
        isLogin: true,
      };
    case LogoutSuccessfull:
      return {
        ...state,
        user: null,
        isLogin: false,
      };
    default:
      return state;
  }
};

export default authReducer;
