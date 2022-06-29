import { createContext, FC, useCallback, useContext, useEffect, useState } from 'react';
import authApi from 'api/auth';
import { SessionModel } from 'models/session';
import { UserModel } from 'models/user';
import { useEventCenterUpdate } from '../../../event-center';

interface AuthContext {
  isAnonymous: boolean;
  session: SessionModel;
  user: UserModel;
}

const initialState: AuthContext = {
  session: undefined,
  user: undefined,
  isAnonymous: true,
};

const context = createContext<AuthContext>(undefined);
const { Provider } = context;

const AuthProvider: FC = (props) => {
  const { children } = props;
  const [state, setState] = useState<AuthContext>(initialState);

  const initAuth = useCallback(async () => {
    const currentSession = await authApi.getCurrentSession();

    if (currentSession) {
      const currentUser = await authApi.getUserInfo();
      setState({
        session: currentSession,
        user: currentUser,
        isAnonymous: !currentUser.emailVerification,
      })
    }
  }, [state]);

  useEffect(() => {
    initAuth();
  }, []);

  useEventCenterUpdate('SESSION_CREATED', initAuth);

  return (
    <Provider value={state}>{children}</Provider>
  );
};

export const useAuth = () => useContext(context);
export const useUserInfo = () => {
  const { user, isAnonymous } = useContext(context);
  return { user, isAnonymous };
};

export default AuthProvider;
