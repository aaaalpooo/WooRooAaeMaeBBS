import { combineReducers } from 'redux';
import auth, { AuthState } from './auth';
import modal, { ModalState } from './modal';
import menu, { MenuState } from './menu';
import write, { WriteState } from './write';
import list, { ListState } from './list';
import { penderReducer as pender } from 'redux-pender';

export default combineReducers({
  auth,
  modal,
  menu,
  write,
  list,
  pender,
});

export type State = {
  auth: AuthState;
  modal: ModalState;
  menu: MenuState;
  write: WriteState;
  list: ListState;
  pender: {
    pending: any;
    success: any;
    failure: any;
  };
};
