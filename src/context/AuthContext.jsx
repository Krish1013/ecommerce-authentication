import { createContext, useReducer, useEffect, useCallback } from 'react';
import { loginUser as apiLogin, registerUser as apiRegister } from '../services/api';

export const AuthContext = createContext(null);

// Action types
const AUTH_ACTIONS = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  RESTORE_SESSION: 'RESTORE_SESSION',
};

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  initializing: true,
};

function authReducer(state, action) {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
      return { ...state, loading: true, error: null };
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        error: null,
      };
    case AUTH_ACTIONS.LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case AUTH_ACTIONS.LOGOUT:
      return { ...initialState, initializing: false };
    case AUTH_ACTIONS.RESTORE_SESSION:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        initializing: false,
      };
    default:
      return { ...state, initializing: false };
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('auth_user');
      const storedToken = localStorage.getItem('auth_token');
      if (storedUser && storedToken) {
        dispatch({
          type: AUTH_ACTIONS.RESTORE_SESSION,
          payload: { user: JSON.parse(storedUser), token: storedToken },
        });
      } else {
        dispatch({ type: 'INIT_COMPLETE' });
      }
    } catch {
      dispatch({ type: 'INIT_COMPLETE' });
    }
  }, []);

  const login = useCallback(async (email, password) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });
    try {
      const data = await apiLogin(email, password);
      localStorage.setItem('auth_user', JSON.stringify(data.user));
      localStorage.setItem('auth_token', data.token);
      dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: data });
      return data;
    } catch (err) {
      dispatch({ type: AUTH_ACTIONS.LOGIN_FAILURE, payload: err.message });
      throw err;
    }
  }, []);

  const signup = useCallback(async (name, email, password) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });
    try {
      const data = await apiRegister(name, email, password);
      localStorage.setItem('auth_user', JSON.stringify(data.user));
      localStorage.setItem('auth_token', data.token);
      dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: data });
      return data;
    } catch (err) {
      dispatch({ type: AUTH_ACTIONS.LOGIN_FAILURE, payload: err.message });
      throw err;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_token');
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_FAILURE, payload: null });
  }, []);

  const value = {
    ...state,
    login,
    signup,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
