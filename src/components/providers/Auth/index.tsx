import { createContext, FC, useContext, useMemo, useState } from 'react';
import { AuthCredentials } from 'models/account';
import authApi from 'api/auth';

interface AuthContext {
  session: string;
  createAnonymousSession: () => Promise<void>;
  createSession: (credentials: AuthCredentials) => void;
  logout: () => void;
}

const context = createContext<AuthContext>(undefined);
const { Provider } = context;

const AuthProvider: FC = (props) => {
  const { children } = props;
  const [session, setSession] = useState<string>(undefined);

  const contextValue = useMemo<AuthContext>(() => ({
    session,
    createAnonymousSession: async () => {
      const newSession = await authApi.createAnonymousSession();
      setSession(newSession.$id);
    },
    createSession: async (credentials: AuthCredentials) => {
      const newSession = await authApi.signIn(credentials);
      setSession(newSession.$id);
    },
    logout: () => authApi.logout(session),
  }), [session]);

  return (
    <Provider value={contextValue}>{children}</Provider>
  );
};

export const useAuth = () => useContext(context);
export const useSession = () => useContext(context).session;

export default AuthProvider;
