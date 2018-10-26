import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { applyPenders } from 'lib/common';

const CHANGE_INPUT = 'write/CHANGE_INPUT';

export const writeActions = {
  changeInput: createAction<string, string>(CHANGE_INPUT, text => text),
};

type WriteActionType = ReturnType<typeof writeActions.changeInput>;

export type WriteState = {
  text: string;
};

const initialState: WriteState = {
  text: '',
};

const reducers = handleActions<WriteState, any>(
  {
    [CHANGE_INPUT]: (state: WriteState, action: WriteActionType) => {
      return produce(state, draft => {
        if (action.payload !== undefined) {
          draft.text = action.payload;
        }
      });
    },
  },
  initialState
);

// const penders = [];

export default (state: WriteState, action: any) => {
  return applyPenders(reducers, state, action, undefined);
};
