import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { applyPenders } from 'lib/common';

const MANAGE_MENU_VISIBLE = 'menu/MANAGE_MENU_VISIBLE';

export const menuActions = {
  manageMenuVisible: createAction<boolean, boolean>(
    MANAGE_MENU_VISIBLE,
    visible => visible
  ),
};

type ManageMenuVisibleActions = ReturnType<
  typeof menuActions.manageMenuVisible
>;

export type MenuState = {
  visible: boolean;
};

const initialState: MenuState = {
  visible: false,
};

const reducer = handleActions<MenuState, any>(
  {
    [MANAGE_MENU_VISIBLE]: (
      state: MenuState,
      action: ManageMenuVisibleActions
    ) => {
      return produce(state, draft => {
        if (action.payload !== undefined) {
          draft.visible = action.payload;
        }
      });
    },
  },
  initialState
);

// const penders = [];

export default (state: MenuState, action: any) => {
  return applyPenders(reducer, state, action, undefined);
};
