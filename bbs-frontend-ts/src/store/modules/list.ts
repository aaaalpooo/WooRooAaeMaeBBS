import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';
import * as ListAPI from 'lib/api/list';
import { applyPenders } from 'lib/common';

const GET_LIST = 'list/GET_LIST';

export const listActions = {
  getList: createAction(GET_LIST, ListAPI.getList),
};

export type BbsItem = {
  id: number;
  username: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
};

type GetListAction = {
  payload: {
    data: {
      list: [BbsItem];
    };
    response: {
      data: {};
    };
  };
};

export type ListState = {
  list: [BbsItem?];
};

const initialState: ListState = {
  list: [],
};

const reducer = handleActions<ListState, any>({}, initialState);

const penders = [
  {
    type: GET_LIST,
    onSuccess: (state: ListState, action: GetListAction) => {
      return produce(state, draft => {
        const { list } = action.payload.data;
        draft.list = list;
      });
    },
  },
];

export default (state: ListState, action: any) => {
  return applyPenders(reducer, state, action, penders);
};
