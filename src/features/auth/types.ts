export interface ValidateEmailState {
  validateEmailLoading: boolean;
  validateEmailSuccess?: string;
  validateEmailFailed?: string;
}

export interface VerifyCodeState {
  verifyCodeLoading: boolean;
  verifyCodeSuccess?: string;
  verifyCodeFailed?: string;
}

export interface AuthState extends ValidateEmailState, VerifyCodeState {}
