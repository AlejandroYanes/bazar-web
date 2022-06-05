import { createContext, FC, useContext, useEffect, useMemo, useState } from 'react';
import { AuthCredentials } from 'models/account';
import authApi from 'api/auth';
import { SessionModel } from '../../../models/session';
import { UserModel } from '../../../models/user';

interface AuthContext {
  isAnonymous: boolean;
  session: SessionModel;
  user: UserModel;
  createAnonymousSession: () => Promise<SessionModel>;
  createSession: (credentials: AuthCredentials) => void;
  logout: () => void;
}

const context = createContext<AuthContext>(undefined);
const { Provider } = context;

const AuthProvider: FC = (props) => {
  const { children } = props;
  const [session, setSession] = useState<SessionModel | undefined>(undefined);
  const [currentUser, setCurrentUser] = useState<UserModel | undefined>(undefined);
  const [isAnonymous, setIsAnonymous] = useState(true);

  const contextValue = useMemo<AuthContext>(() => ({
    isAnonymous,
    session,
    user: currentUser,
    createAnonymousSession: async (): Promise<SessionModel> => {
      const newSession = await authApi.createAnonymousSession();
      setSession(newSession);
      return newSession;
    },
    createSession: async (credentials: AuthCredentials) => {
      const newSession = await authApi.signIn(credentials);
      setSession(newSession);
    },
    logout: () => authApi.logout(session.$id),
  }), [session, currentUser, isAnonymous]);

  const initAuth = async () => {
    const currentSession = await authApi.getCurrentSession();

    if (currentSession) {
      setSession(currentSession);
      const currentUser = await authApi.getUserInfo();
      setCurrentUser(currentUser);
      setIsAnonymous(!currentUser.emailVerification);
    }
  };

  useEffect(() => {
    initAuth();
  }, []);

  return (
    <Provider value={contextValue}>{children}</Provider>
  );
};

export const useAuth = () => useContext(context);
export const useSession = () => useContext(context).session;
export const useUserInfo = () => {
  const { user, isAnonymous } = useContext(context);
  return { user, isAnonymous };
};

export default AuthProvider;
