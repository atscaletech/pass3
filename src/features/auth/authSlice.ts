import { createSlice, Reducer, createAction } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from 'app/hooks';
import authAPI from './authAPI';
import { AuthState, ValidateEmailState, VerifyCodeState } from './types';
import { RootState } from 'app/store';

const initialState: AuthState = {
  validateEmailFailed: undefined,
  validateEmailSuccess: undefined,
  validateEmailLoading: false,

  verifyCodeLoading: false,
  verifyCodeSuccess: undefined,
  verifyCodeFailed: undefined,
};

export const validateEmail = createAppAsyncThunk(
  'auth/validateEmail',
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await authAPI.validateEmail(email);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const verifyCode = createAppAsyncThunk(
  'auth/verifyCode',
  async (code: string, { rejectWithValue }) => {
    try {
      const response = await authAPI.validateCode(code);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const resetStore = createAction('RESET_STORE');

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(validateEmail.pending, state => {
        state.validateEmailLoading = true;
      })
      .addCase(validateEmail.fulfilled, (state, { payload }) => {
        state.validateEmailSuccess = payload;
        state.validateEmailLoading = false;
      })
      .addCase(verifyCode.pending, state => {
        state.verifyCodeLoading = true;
      })
      .addCase(verifyCode.fulfilled, (state, { payload }) => {
        state.verifyCodeSuccess = payload;
        state.verifyCodeLoading = false;
      });
  },
});

export const selectValidateEmailState = ({
  auth: { validateEmailLoading, validateEmailSuccess, validateEmailFailed },
}: RootState): ValidateEmailState => ({
  validateEmailLoading,
  validateEmailSuccess,
  validateEmailFailed,
});

export const selectVerifyCodeState = ({
  auth: { verifyCodeLoading, verifyCodeSuccess, verifyCodeFailed },
}: RootState): VerifyCodeState => ({
  verifyCodeLoading,
  verifyCodeSuccess,
  verifyCodeFailed,
});

export default authSlice.reducer as Reducer<AuthState>;
