import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '../services/authService';

interface Usuario {
  usuarioid: number;
  nombre: string;
  correo: string;
  rol: string;
}

interface AuthContextType {
  usuario: Usuario | null;
  isAuthenticated: boolean;
  login: (token: string, usuario: Usuario) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay un usuario autenticado al cargar la aplicación
    const token = authService.getToken();
    const usuarioGuardado = authService.getUsuario();
    
    if (token && usuarioGuardado) {
      setUsuario(usuarioGuardado);
    }
    
    setIsLoading(false);
  }, []);

  const login = (token: string, usuarioData: Usuario) => {
    authService.setToken(token);
    authService.setUsuario(usuarioData);
    setUsuario(usuarioData);
  };

  const logout = () => {
    authService.logout();
    setUsuario(null);
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        isAuthenticated: !!usuario,
        login,
        logout,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
} 