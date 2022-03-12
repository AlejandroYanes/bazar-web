import {
  createContext,
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { UserInfo } from 'models/user';
import { clearStorage, getUserInfo, storeAuthToken, storeUserInfo } from 'helpers';

interface AuthState {
  isLoggedIn: boolean;
  userInfo: UserInfo;
}

interface AuthContext {
  state: AuthState;
  actions: {
    updateUserInfo: (user: UserInfo) => void;
    login: (user: UserInfo) => void;
    logout: () => void;
  };
}

const getInitialState = (): AuthState => {
  return {
    isLoggedIn: false,
    userInfo: undefined,
  };
  // return {
  //   isLoggedIn: true,
  //   userInfo: {
  //     avatar: 'user4',
  //     userName: 'alejandro.yanes94',
  //     email: 'ale@gmail.com',
  //     name: 'Alejandro Yanes',
  //     theme: AppTheme.SummerVibes,
  //     useDarkStyle: true,
  //     verificationLevel: VerificationLevel.USER_INFO_ADDED,
  //   } as UserInfo,
  // };
};

const AuthContext = createContext<AuthContext>(undefined);

const AuthProvider: FunctionComponent = (props) => {
  const { children } = props;
  const [state, setState] = useState<AuthState>(getInitialState);

  const updateUserInfo = useCallback((userInfo: UserInfo) => {
    storeUserInfo(userInfo);
    setState({ isLoggedIn: true, userInfo });
  }, []);

  const login = useCallback((userInfo: UserInfo) => {
    storeAuthToken(userInfo.accessToken);
    updateUserInfo(userInfo);
  }, []);

  const logout = useCallback(() => {
    clearStorage();
    setState({ isLoggedIn: false, userInfo: undefined });
  }, []);

  useEffect(() => {
    const storedUserInfo = getUserInfo();
    if (storedUserInfo?.accessToken) {
      setState({ isLoggedIn: true, userInfo: storedUserInfo });
    }
  }, []);

  const contextValue = useMemo<AuthContext>(() => ({
    state,
    actions: {
      updateUserInfo,
      login,
      logout,
    },
  }), [state, updateUserInfo, login, logout]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthData = () => useContext(AuthContext).state;
export const useAuthActions = () => useContext(AuthContext).actions;

export default AuthProvider;
