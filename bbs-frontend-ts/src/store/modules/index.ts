import { combineReducers } from 'redux';
import auth, { AuthState } from './auth';
import modal, { ModalState } from './modal';
import menu, { MenuState } from './menu';
import { penderReducer as pender } from 'redux-pender';

export default combineReducers({
  auth,
  modal,
  menu,
  pender,
});

export type State = {
  auth: AuthState;
  modal: ModalState;
  menu: MenuState;
  pender: {
    pending: any;
    success: any;
    failure: any;
  };
};
