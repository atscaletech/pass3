import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Container,
} from '@mui/material';
import styled from '@emotion/styled';
import PATHS from 'router/paths';
import { StyledLink } from 'components/common/Styled';
import { useEmailInput } from 'app/hooks';
import { getKeys } from 'fastAuth';
import { useLogin } from '../hooks';

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 40px;
`;

const StyledCustomFormItem = styled(Box)`
  .custom-form-item-label {
    padding-bottom: 10px;
    display: block;
  }

  .Mui-error {
    margin-left: 0 !important;
  }
`;

const abortController = new AbortController();

const Login = () => {
  const { email, isEmailError, validateEmailInput, onEmailChange, cleanEmail } =
    useEmailInput();

  const { onLogin } = useLogin();

  const handleSubmit = async () => {
    const isEmail = validateEmailInput(email);

    if (isEmail) {
      abortController.abort();

      const { username, walletPublicKey } = await getKeys(
        cleanEmail,
        abortController,
      );
      onLogin({ username, walletPublicKey });
    }
  };

  useEffect(() => {
    const init = async () => {
      if (
        typeof window.PublicKeyCredential !== 'undefined' &&
        typeof (window.PublicKeyCredential as any)
          .isConditionalMediationAvailable === 'function'
      ) {
        const available = await (
          PublicKeyCredential as any
        ).isConditionalMediationAvailable();

        if (available) {
          try {
            console.log('available', available);
            const { username, walletPublicKey } = await getKeys(
              '',
              abortController,
            );
            onLogin({ username, walletPublicKey });
          } catch (err) {
            console.error('Error with conditional UI:', err);
          }
        }
      }
    };
    init();
    
    return () => {
      abortController.abort();
    };
  }, [onLogin]);

  return (
    <Container>
      <Box sx={{ paddingTop: 10 }}>
        <Typography
          variant='h5'
          component='h2'
          textAlign={'center'}
          fontWeight={'700'}>
          Sign In
        </Typography>

        <StyledCustomFormItem mt={5} display='block'>
          <label
            className='custom-form-item-label'
            style={{
              color: isEmailError ? '#d32f2f' : 'rgba(0, 0, 0, 0.6)',
            }}>
            Email
          </label>

          <TextField
            fullWidth
            name='username'
            autoComplete='username webauthn'
            value={email}
            type='email'
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              onEmailChange(event.target.value);
            }}
            variant='outlined'
            required
            error={isEmailError}
            helperText={isEmailError && 'Email invalid!'}
          />
        </StyledCustomFormItem>

        <StyledButton onClick={handleSubmit} variant='contained'>
          {false && <CircularProgress size={16} style={{ marginRight: 10 }} />}
          Continue
        </StyledButton>

        <StyledLink style={{ marginTop: 40 }} to={PATHS.auth.register}>
          Sign Up
        </StyledLink>

        <StyledLink to={PATHS.auth.register}>Recover my account</StyledLink>

        <Typography
          variant='body2'
          color='rgba(0, 0, 0, 0.6)'
          fontSize='0.875rem'
          textAlign='center'
          mt={8}>
          CopyRight:{' '}
          <Typography component='a' variant='body2'>
            Pass3.io
          </Typography>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
