import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { applyPenders } from 'lib/common';

const MODAL_ACTION = 'modal/MODAL_ACTION';

type ModalActionPayload = {
  visible: boolean;
  openingModal: string;
};

export const modalActions = {
  modalAction: createAction<ModalActionPayload, ModalActionPayload>(
    MODAL_ACTION,
    modal => modal
  ),
};

type ModalAction = ReturnType<typeof modalActions.modalAction>;

export type ModalState = {
  openingModal: string;
  visible: boolean;
};

const initialState: ModalState = {
  openingModal: '',
  visible: false,
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
  },
  initialState
);

// const penders = [];

export default (state: ModalState, action: any) => {
  return applyPenders(reducer, state, action, undefined);
};
