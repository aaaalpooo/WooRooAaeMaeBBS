import { combineReducers } from 'redux';
import auth, { AuthState } from './auth';
import modal, { ModalState } from './modal';
import menu, { MenuState } from './menu';
import write, { WriteState } from './write';
import { penderReducer as pender } from 'redux-pender';

export default combineReducers({
  auth,
  modal,
  menu,
  write,
  pender,
});

export type State = {
  auth: AuthState;
  modal: ModalState;
  menu: MenuState;
  write: WriteState;
  pender: {
    pending: any;
    success: any;
    failure: any;
  };
};
