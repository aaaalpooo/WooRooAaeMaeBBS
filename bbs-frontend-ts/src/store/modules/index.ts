import { combineReducers } from 'redux';
import auth, { AuthState } from './auth';
import modal, { ModalState } from './modal';
import { penderReducer as pender } from 'redux-pender';

export default combineReducers({
  auth,
  modal,
  pender,
});

export type State = {
  auth: AuthState;
  modal: ModalState;
  pender: {
    pending: any;
    success: any;
    failure: any;
  };
};
