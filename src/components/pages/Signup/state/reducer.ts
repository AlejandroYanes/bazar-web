export enum Actions {
  SET_FORM_STATE = 'SET_FORM_STATE',
  SET_ERRORS = 'SET_ERRORS',
  START_LOADING = 'START_LOADING',
  FINISH_LOADING = 'FINISH_LOADING',
}

export interface Credentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmation: string;
}

export interface SignUpState {
  isLoading: boolean;
  credentials: Credentials;
  errors: { [x: string]: string };
}

export default function signupReducer(state: SignUpState, action): SignUpState {
  const { type, payload } = action;

  switch (type as Actions) {
    case Actions.SET_FORM_STATE:
      return { ...state, credentials: payload };
    case Actions.SET_ERRORS:
      return { ...state, errors: payload, isLoading: false };
    case Actions.START_LOADING:
      return { ...state, isLoading: true };
    case Actions.FINISH_LOADING:
      return { ...state, isLoading: false };
    default:
      return state;
  }
}
