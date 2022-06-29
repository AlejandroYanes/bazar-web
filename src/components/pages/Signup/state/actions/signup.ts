import { NotificationType, showNotification, validateEntity } from 'activate-components';
import { SessionModel } from 'models/session';
import authApi from 'api/auth';
import { Actions, Credentials } from '../reducer';
import { rules } from '../rules';
import { notifyEventChannel } from '../../../../../event-center';

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
      return;
    }

    dispatch({ type: Actions.START_LOADING });
    const { email, password, firstName, lastName } = credentials;
    const fullName = `${firstName} ${lastName}`;

    try {
      if (session && isAnonymous) {
        await authApi.updateEmail({ email, password });
        await authApi.updateName(fullName);
      } else {
        await authApi.signUp({ email, password, name: fullName });
        await authApi.signIn({ email, password });
        notifyEventChannel('SESSION_CREATED');
      }

      await authApi.updatePreferences({ firstName, lastName });
      await authApi.sendVerificationEmail();
    } catch (e) {
      showNotification({
        type: NotificationType.WARNING,
        title: 'Ooh, algo no salió bien',
        message: 'Huvo un problema procesando el registro'
      })
    } finally {
      dispatch({ type: Actions.FINISH_LOADING });
    }
  };
}
