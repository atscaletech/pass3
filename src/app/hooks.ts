import { createContext, useContext, useRef, useEffect } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const NotifyContext = createContext<any>({});

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
}>();

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type ReactToResult = (
  result: any,
  customMess?: string | React.MutableRefObject<string>,
  callback?: (success?: any) => any,
) => any;

export const useSuccess: ReactToResult = (success, customMess, callback) => {
  const messageApi = useContext(NotifyContext);
  const isMounted = useRef<any>(null);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      if (success) {
        if (customMess) {
          const message =
            typeof customMess !== 'string' ? customMess.current : customMess;
          messageApi.open({
            type: 'success',
            content: message,
          });
        }

        callback?.(success);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, customMess]);
};

export const useFailed: ReactToResult = (error, customMess, callback) => {
  const messageApi = useContext(NotifyContext);
  const isMounted = useRef<any>(null);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      if (error) {
        messageApi.open({
          type: 'error',
          content: customMess || error?.message || 'Something went w',
        });
        callback?.(error);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);
};
