import { validateEntity } from 'activate-components';
import { SessionModel } from 'models/session';
import authApi from 'api/auth';
import { Actions, Credentials } from '../reducer';
import { rules } from '../ruels';

export default function signup(
  dispatch,
  credentials: Credentials,
  session: SessionModel,
  isAnonymous: boolean,
) {
  return async () => {
    const { hasErrors, errors } = validateEntity(credentials, rules);

    if (hasErrors) {
      dispatch({ type: Actions.SET_ERRORS, payload: errors });
    }

    dispatch({ type: Actions.START_LOADING });

    if (session && isAnonymous) {
      await authApi.updateCredentials({
        email: credentials.email,
        password: credentials.password,
      });
      await authApi.updateName(`${credentials.name} ${credentials.lastName}`);
      await authApi.updatePreferences({
        firstName: credentials.name,
        lastName: credentials.lastName,
      });
    }
  };
}
