import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  CircularProgress,
  useMediaQuery,
} from '@mui/material';
import styled from '@emotion/styled';
import { StyledLink } from 'components/common/Styled';
import PATHS from 'router/paths';
import { useValidateEmail } from '../hooks';
import { useEmailInput } from 'app/hooks';

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

const EnterEmail = ({ goToVerify }: { goToVerify: () => void }) => {
  const { onValidateEmail, validateEmailSuccess, validateEmailLoading } =
    useValidateEmail(goToVerify);
  const { email, isEmailError, onEmailChange, cleanEmail, validateEmailInput } =
    useEmailInput(validateEmailSuccess);

  const [agreedTerm, setAgreedTerm] = useState(false);

  const handleSubmit = () => {
    const isEmail = validateEmailInput(email);
    if (isEmail) {
      onValidateEmail(cleanEmail);
    }
  };

  const isDisableContinue = !email || !agreedTerm;
  const isDesktop = useMediaQuery('(min-width:600px)');

  return (
    <Box sx={{ paddingTop: 10 }}>
      <Typography
        variant='h5'
        component='h2'
        textAlign={'center'}
        fontWeight={'700'}>
        Create account
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
          autoComplete='off'
          value={email}
          type='email'
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            onEmailChange(event.target.value);
          }}
          variant='outlined'
          required
          error={isEmailError}
          helperText={isEmailError && 'Email invalid!'}
          disabled={validateEmailLoading}
        />
      </StyledCustomFormItem>

      <FormControlLabel
        style={{ marginTop: isDesktop ? 25 : -5 }}
        control={
          <Checkbox
            checked={agreedTerm}
            onChange={e => setAgreedTerm(e.target.checked)}
          />
        }
        label={
          <Typography style={{ marginTop: isDesktop ? 0 : 25 }}>
            I agree to the <strong>Term Of Service</strong> and{' '}
            <strong>Privacy Policy</strong>
          </Typography>
        }></FormControlLabel>

      <StyledButton
        onClick={handleSubmit}
        disabled={isDisableContinue || validateEmailLoading}
        variant='contained'>
        {validateEmailLoading && (
          <CircularProgress size={16} style={{ marginRight: 10 }} />
        )}
        Continue
      </StyledButton>

      <StyledLink
        style={{
          marginTop: 30,
        }}
        to={PATHS.auth.signIn}>
        Sign In
      </StyledLink>

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
  );
};

export default EnterEmail;
