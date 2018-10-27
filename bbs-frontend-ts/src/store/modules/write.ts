import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { applyPenders } from 'lib/common';
import * as WriteAPI from 'lib/api/write';

const CHANGE_INPUT = 'write/CHANGE_INPUT';
const RECEIVE_LAST_POST = 'write/RECEIVE_LAST_POST';
const WRITE = 'write/WRITE';

export const writeActions = {
  changeInput: createAction<string, string>(CHANGE_INPUT, text => text),
  write: createAction(WRITE, WriteAPI.write),
  receiveLastPost: createAction<Post, Post>(RECEIVE_LAST_POST, post => post),
};

type ChangeInputType = ReturnType<typeof writeActions.changeInput>;
type ReceiveLastPostType = ReturnType<typeof writeActions.receiveLastPost>;
type WriteType = {
  payload: {
    data: {
      success: boolean;
      lastPost: Post;
    };
  };
};

export type Post = {
  id: number;
  username: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
};

export type WriteState = {
  text: string;
  lastPost: Post;
};

const initialState: WriteState = {
  text: '',
  lastPost: {
    id: -1,
    username: '',
    title: '',
    content: '',
    createdAt: new Date(),
    updatedAt: undefined,
  },
};

const reducers = handleActions<WriteState, any>(
  {
    [CHANGE_INPUT]: (state: WriteState, action: ChangeInputType) => {
      return produce(state, draft => {
        if (action.payload !== undefined) {
          draft.text = action.payload;
        }
      });
    },
    [RECEIVE_LAST_POST]: (state: WriteState, action: ReceiveLastPostType) => {
      return produce(state, draft => {
        if (action.payload !== undefined) {
          draft.lastPost = action.payload;
        }
      });
    },
  },
  initialState
);

const penders = [
  {
    type: WRITE,
    onSuccess: (state: WriteState, action: WriteType) => {
      return produce(state, draft => {
        // const { lastPost } = action.payload.data;
        // draft.lastPost = lastPost;
        draft.text = '';
      });
    },
  },
];

export default (state: WriteState, action: any) => {
  return applyPenders(reducers, state, action, penders);
};
