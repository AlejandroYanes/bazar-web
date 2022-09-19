import { Dispatch } from 'react';

export interface State {
  showModal: boolean;
  quantity: number;
}

export enum ACTIONS {
  OPEN_MODAL = 'OPEN_MODAL',
  CLOSE_MODAL = 'CLOSE_MODAL',
  SET_QUANTITY = 'SET_QUANTITY',
  RESET_STATE = 'RESET_STATE',
}

export interface Action {
  type: ACTIONS;
  payload?: any;
}

export type CustomDispatch = Dispatch<Action>;
