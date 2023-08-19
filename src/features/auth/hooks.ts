import { validateEmail, verifyCode, selectAuthState } from './authSlice';
import { useAppDispatch, useAppSelector, useSuccess } from 'app/hooks';

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
