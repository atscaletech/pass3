import { useCallback, useEffect } from 'react';
import {
  validateEmail,
  verifyCode,
  selectAuthState,
  setUserInfo,
} from './authSlice';
import { useAppDispatch, useAppSelector, useSuccess } from 'app/hooks';
import { useNavigate } from 'react-router-dom';
import PATHS from 'router/paths';

export const useValidateEmail = (callback?: () => void) => {
  const state = useAppSelector(selectAuthState);
  const dispatch = useAppDispatch();

  const onValidateEmail = (email: string) => {
    dispatch(validateEmail(email));
  };

  useSuccess(state.validateEmailSuccess, '', callback);

  return { ...state, onValidateEmail };
};

export const useVerifyCode = (callback?: () => void) => {
  const state = useAppSelector(selectAuthState);
  const dispatch = useAppDispatch();

  const onVerifyCode = (code: string) => {
    dispatch(verifyCode(code));
  };

  useSuccess(state.verifyCodeSuccess, '', callback);

  return { ...state, onVerifyCode };
};

export const useLogin = () => {
  const state = useAppSelector(selectAuthState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onLogin = useCallback(
    (userInfo: { username: string; walletPublicKey: string }) => {
      dispatch(setUserInfo(userInfo));
    },
    [dispatch],
  );

  useEffect(() => {
    if (state.username) {
      navigate(PATHS.dashboard);
    }
  }, [state.username, navigate]);

  return {
    ...state,
    onLogin,
  };
};

export const useAuthState = () => {
  const state = useAppSelector(selectAuthState);
  return state;
};
