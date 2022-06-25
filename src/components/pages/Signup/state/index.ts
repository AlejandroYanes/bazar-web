import { useCallback, useReducer } from 'react';
import { useAtomicSet } from 'helpers';
import { useAuth } from 'components/providers/Auth';
import signupReducer, { Actions, Credentials } from './reducer';
import signup from './actions/signup';

export * from './ruels';

export default function useSignupState() {
  const { isAnonymous, session } = useAuth();
  const [state, dispatch] = useReducer(signupReducer, {
    credentials: {} as Credentials,
    errors: {},
    isLoading: false,
  });

  return {
    state,
    actions: {
      setCredentials: useAtomicSet(dispatch, Actions.SET_FORM_STATE),
      setErrors: useAtomicSet(dispatch, Actions.SET_ERRORS),
      signup: useCallback(
        signup(dispatch, state.credentials, session, isAnonymous),
        [state.credentials],
      )
    },
  };
}
