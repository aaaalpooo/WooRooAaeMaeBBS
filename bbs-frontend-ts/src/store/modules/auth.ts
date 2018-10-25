import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';
import * as AuthAPI from 'lib/api/auth';
import { applyPenders } from 'lib/common';

const LOGIN = 'auth/LOGIN';
const REGISTER = 'auth/REGISTER';
const CHECK = 'auth/CHECK';
const CHANGE_INPUT = 'auth/CHANGE_INPUT';
const INITIALIZE_INPUT = 'auth/INITIALIZE_INPUT';
const TEMP_LOGIN = 'auth/TEMP_LOGIN';
const LOGOUT = 'auth/LOGOUT';
const MANAGE_ERROR = 'auth/MANAGE_ERROR';

export type ChangeInputPayload = { name: string; value: string };
export type ErrorPayload = { error: boolean; errorMessage: string };

export const authActions = {
  login: createAction(LOGIN, AuthAPI.login),
  register: createAction(REGISTER, AuthAPI.register),
  check: createAction(CHECK, AuthAPI.check),
  changeInput: createAction<ChangeInputPayload, ChangeInputPayload>(
    CHANGE_INPUT,
    (payload: ChangeInputPayload) => payload
  ),
  initializeInput: createAction(INITIALIZE_INPUT),
  tempLogin: createAction(TEMP_LOGIN),
  logout: createAction(LOGOUT, AuthAPI.logout),
  manageError: createAction<ErrorPayload, ErrorPayload>(
    MANAGE_ERROR,
    error => error
  ),
};

type LoginAction = {
  payload: {
    data: {
      success: boolean;
      token: string;
    };
  };
};

type RegisterAction = {
  payload: {
    data: {
      success: boolean;
      username: string;
      token: string;
    };
    response: {
      data: {
        validation: boolean;
        username: boolean;
        email: boolean;
        existing: boolean;
        password: boolean;
      };
    };
  };
};

type CheckAction = {
  payload: {
    data: {
      logged: boolean;
    };
  };
};

type ChangeInputAction = ReturnType<typeof authActions.changeInput>;
type InitializeInputAction = ReturnType<typeof authActions.initializeInput>;
type TempLoginAction = ReturnType<typeof authActions.tempLogin>;

type LogoutAction = {
  payload: {
    data: {
      success: boolean;
    };
  };
};

type ManageErrorAction = ReturnType<typeof authActions.manageError>;

export type Inputs = {
  username: string;
  password: string;
  passwordCheck: string;
  email: string;
};

export type AuthState = {
  logged: boolean;
  token: string;
  inputs: Inputs;
  error: boolean;
  errorMessage: string;
};

const initialState: AuthState = {
  logged: false,
  token: '',
  inputs: {
    username: '',
    password: '',
    passwordCheck: '',
    email: '',
  },
  error: false,
  errorMessage: '',
};

const reducer = handleActions<AuthState, any>(
  {
    [CHANGE_INPUT]: (state: AuthState, action: ChangeInputAction) => {
      return produce(state, draft => {
        if (action.payload !== undefined) {
          const { name, value } = action.payload;
          draft.inputs[name] = value;
        }
      });
    },
    [INITIALIZE_INPUT]: (state: AuthState, action: InitializeInputAction) => {
      return produce(state, draft => {
        draft.inputs = initialState.inputs;
      });
    },
    [TEMP_LOGIN]: (state: AuthState, action: TempLoginAction) => {
      return produce(state, draft => {
        draft.logged = true;
      });
    },
    [MANAGE_ERROR]: (state: AuthState, action: ManageErrorAction) => {
      return produce(state, draft => {
        if (action.payload !== undefined) {
          draft.error = action.payload.error;
          draft.errorMessage = action.payload.errorMessage;
        }
      });
    },
  },
  initialState
);

const penders = [
  {
    type: LOGIN,
    onSuccess: (state: AuthState, action: LoginAction) => {
      return produce(state, draft => {
        const { success, token } = action.payload.data;
        if (success) {
          draft.logged = true;
          draft.token = token;
        } else {
          draft.logged = false;
        }
      });
    },
    onFailure: (state: AuthState, action: LoginAction) => {
      return produce(state, draft => {
        draft.logged = false;
      });
    },
  },
  {
    type: REGISTER,
    onSuccess: (state: AuthState, action: RegisterAction) => {
      return produce(state, draft => {
        const { success, token } = action.payload.data;
        if (success) {
          draft.logged = true;
          draft.token = token;
        }
      });
    },
    onFailure: (state: AuthState, action: RegisterAction) => {
      return produce(state, draft => {
        const {
          username,
          password,
          email,
          validation,
          existing,
        } = action.payload.response.data;
        draft.logged = false;
        draft.error = true;
        if (username) {
          if (validation) {
            draft.errorMessage =
              '알파벳과 숫자로된 6자 이상의 아이디로 입력하라!';
            return;
          }
          if (existing) {
            draft.errorMessage = '이미 존재하는 아이디니, 다른것으로 하라!';
            return;
          }
          draft.errorMessage = '아이디를 입력하라!';
          return;
        }
        if (password) {
          if (validation) {
            draft.errorMessage =
              '알파벳과 숫자로된 6자 이상의 패스워드로 입력하라!';
            return;
          }
          draft.errorMessage = '비밀번호를 입력하라!';
          return;
        }
        if (email) {
          if (validation) {
            draft.errorMessage = '정확한 이메일을 입력하라!';
            return;
          }
          if (existing) {
            draft.errorMessage = '이미 존재하는 이메일이니, 다른것으로 하라!';
            return;
          }
          draft.errorMessage = '이메일을 입력하라!';
          return;
        }
      });
    },
  },
  {
    type: CHECK,
    onSuccess: (state: AuthState, action: CheckAction) => {
      return produce(state, draft => {
        const { logged } = action.payload.data;
        if (logged) {
          draft.logged = true;
        } else {
          draft.logged = false;
        }
      });
    },
    onFailure: (state: AuthState, action: CheckAction) => {
      return produce(state, draft => {
        draft.logged = false;
      });
    },
  },
  {
    type: LOGOUT,
    onSuccess: (state: AuthState, action: LogoutAction) => {
      return produce(state, draft => {
        const { success } = action.payload.data;
        if (success) {
          draft.logged = false;
          draft.token = '';
        }
      });
    },
    onFailure: (state: AuthState, action: LogoutAction) => {
      return produce(state, draft => {
        draft.logged = false;
        draft.token = '';
      });
    },
  },
];

export default (state: AuthState, action: any) => {
  return applyPenders(reducer, state, action, penders);
};
