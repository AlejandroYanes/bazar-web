import { Update, State } from './types';

export default function productDetailsReducer (
  state: State,
  update: Update,
): State {
  switch (update.type) {
    case 'open_modal':
      return { ...state, showModal: true };
    case 'close_modal':
      return { ...state, showModal: false };
    case 'set_quantity':
      return { ...state, quantity: update.quantity };
    case 'reset_state':
      return { ...state, showModal: false, quantity: 1 };
  }
}
