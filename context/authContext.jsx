import { createContext, useState, useContext, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import authService from '@/services/authServise';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isTokenValid, setIsTokenValid] = useState(false);

  function checkTokenValidity(token) {
    if (!token) {
      console.log('Срок жизни токена истек');
      setIsTokenValid(false);
      return false;
    }

    // Декодируем токен
    const decodedToken = jwt.decode(token);

    // Получаем текущее время
    const currentTime = Math.floor(Date.now() / 1000);

    // Проверяем, если токен истек
    if (decodedToken?.exp < currentTime) {
      return false; // Токен истек
    }

    if (decodedToken?.exp) {
      console.log(
        'Сроку жизни токена осталось',
        decodedToken?.exp - currentTime,
        'секунд'
      );
    }
    setIsTokenValid(true);
    return true; // Токен действителен
  }

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Проверяем токен при монтировании компонента
    const isTokenValid = checkTokenValidity(token);
    setIsTokenValid(isTokenValid);
    if (!isTokenValid) {
      logout(); // Выполняем выход пользователя
    }
  }, [checkTokenValidity]);

  const login = async (data) => {
    try {
      const res = await authService.login(data);
      localStorage.setItem('token', res.token);

      if (!res.ok) {
        return 'Неправильный email или пароль';
      }
    } catch (error) {
      console.error(error);
    }
  };

  const registration = async (data) => {
    try {
      const res = await authService.register(data);

      if (!res.ok) {
        return 'Такой email уже существует';
      }
      
      localStorage.setItem('token', res.token);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsTokenValid(false);
  };

  return (
    <>
      <AuthContext.Provider
        value={{
          isTokenValid,
          logout,
          login,
          registration,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
}

export function useAuthContext() {
  const value = useContext(AuthContext);

  if (value == null) {
    throw new Error('useAuthContext must be used within a Context.Provider');
  }

  return value;
}
