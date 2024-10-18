import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  verifyTwoFactor: (code: string) => Promise<boolean>;
  updateAdminCredentials: (newUsername: string, newPassword: string) => void;
}

interface User {
  id: string;
  username: string;
  role: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [adminCredentials, setAdminCredentials] = useState({
    username: 'admin',
    password: 'password',
  });

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    // Check against the current admin credentials
    if (
      username === adminCredentials.username &&
      password === adminCredentials.password
    ) {
      const user = {
        id: '1',
        username: adminCredentials.username,
        role: 'admin',
      };
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const verifyTwoFactor = async (code: string): Promise<boolean> => {
    // Simulated 2FA verification
    if (code === '123456') {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateAdminCredentials = (newUsername: string, newPassword: string) => {
    setAdminCredentials({ username: newUsername, password: newPassword });
    // If the user is currently logged in, update their session
    if (user && user.role === 'admin') {
      const updatedUser = { ...user, username: newUsername };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        verifyTwoFactor,
        updateAdminCredentials,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
