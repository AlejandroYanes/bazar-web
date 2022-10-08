import { Action, State } from './types';

export default function productDetailsReducer (state: State, action: Action): State {
  switch (action.type) {
    case 'open_modal':
      return { ...state, showModal: true };
    case 'close_modal':
      return { ...state, showModal: false };
    case 'set_quantity':
      return { ...state, quantity: action.quantity };
    case 'reset_state':
      return { ...state, showModal: false, quantity: 1 };
  }
}
