import { Dispatch } from 'react';

export interface State {
  showModal: boolean;
  quantity: number;
}

export type Update =
  | { type: 'reset_state' }
  | { type: 'open_modal' }
  | { type: 'close_modal' }
  | { type: 'set_quantity'; quantity: number };

export type CustomDispatch = Dispatch<Update>;
