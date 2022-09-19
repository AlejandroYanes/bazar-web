import { Reducer } from 'react';
import { Action, ACTIONS, State } from './types';

const productDetailsReducer: Reducer<State, Action> = (state, action): State => {
  const { type, payload } = action;

  switch (type) {
    case ACTIONS.OPEN_MODAL:
      return { ...state, showModal: true };
    case ACTIONS.CLOSE_MODAL:
      return { ...state, showModal: false };
    case ACTIONS.SET_QUANTITY:
      return { ...state, quantity: payload };
    case ACTIONS.RESET_STATE:
      return { ...state, showModal: false, quantity: 1 };
  }
};

export default productDetailsReducer;
