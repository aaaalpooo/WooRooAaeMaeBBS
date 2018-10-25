import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { applyPenders } from 'lib/common';

const MODAL_ACTION = 'modal/MODAL_ACTION';
const SET_ANIMATE = 'modal/SET_ANIMATE';

type ModalActionPayload = {
  visible: boolean;
  openingModal: string;
};

export const modalActions = {
  modalAction: createAction<ModalActionPayload, ModalActionPayload>(
    MODAL_ACTION,
    modal => modal
  ),
  setAnimate: createAction<boolean, boolean>(SET_ANIMATE, animate => animate),
};

type ModalAction = ReturnType<typeof modalActions.modalAction>;
type SetAnimateAction = ReturnType<typeof modalActions.setAnimate>;

export type ModalState = {
  openingModal: string;
  visible: boolean;
  animate: boolean;
};

const initialState: ModalState = {
  openingModal: '',
  visible: false,
  animate: false,
};

const reducer = handleActions<ModalState, any>(
  {
    [MODAL_ACTION]: (state: ModalState, action: ModalAction) => {
      return produce(state, draft => {
        if (action.payload !== undefined) {
          draft.visible = action.payload.visible;
          draft.openingModal = action.payload.openingModal;
        }
      });
    },
    [SET_ANIMATE]: (state: ModalState, action: SetAnimateAction) => {
      return produce(state, draft => {
        if (action.payload !== undefined) {
          draft.animate = action.payload;
        }
      });
    },
  },
  initialState
);

// const penders = [];

export default (state: ModalState, action: any) => {
  return applyPenders(reducer, state, action, undefined);
};
