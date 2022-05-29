import { createContext, FC, useContext, useMemo, useState } from 'react';
import { AuthCredentials } from 'models/account';
import authApi from 'api/auth';
import { SessionModel } from '../../../models/session';

interface AuthContext {
  session: SessionModel;
  createAnonymousSession: () => Promise<SessionModel>;
  createSession: (credentials: AuthCredentials) => void;
  logout: () => void;
}

const context = createContext<AuthContext>(undefined);
const { Provider } = context;

const AuthProvider: FC = (props) => {
  const { children } = props;
  const [session, setSession] = useState<SessionModel | undefined>(undefined);

  const contextValue = useMemo<AuthContext>(() => ({
    session,
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
  }), [session]);

  return (
    <Provider value={contextValue}>{children}</Provider>
  );
};

export const useAuth = () => useContext(context);
export const useSession = () => useContext(context).session;

export default AuthProvider;
