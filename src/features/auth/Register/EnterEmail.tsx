import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  CircularProgress,
} from '@mui/material';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import PATHS from 'router/paths';
import { useValidateEmail } from '../hooks';
import { getCleanEmail, validateEmailPattern } from 'utils/validator';

const StyledFormControlLabel = styled(FormControlLabel)`
  margin-top: -5px;

  .agree-text {
    margin-top: 24px;
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 40px;
`;

const EnterEmail = ({ goToVerify }: { goToVerify: () => void }) => {
  const { onValidateEmail, validateEmailSuccess, validateEmailLoading } =
    useValidateEmail(goToVerify);

  const [email, setEmail] = useState(validateEmailSuccess || '');
  const [isEmailError, setIsEmailError] = useState(false);
  const [agreedTerm, setAgreedTerm] = useState(false);

  const isDisableContinue = !email || !agreedTerm;

  const handleSubmit = () => {
    const cleanEmail = getCleanEmail(email);
    const isEmail = !!validateEmailPattern(cleanEmail);
    setIsEmailError(!isEmail);

    if (isEmail) {
      onValidateEmail(cleanEmail);
    }
  };

  return (
    <Box sx={{ paddingTop: 10 }}>
      <Typography
        variant='h5'
        component='h2'
        textAlign={'center'}
        fontWeight={'700'}>
        Create account
      </Typography>

      <TextField
        autoComplete='off'
        value={email}
        type='email'
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setEmail(event.target.value);
        }}
        style={{ width: '100%', marginTop: 40 }}
        label='Email Address'
        variant='outlined'
        required
        error={isEmailError}
        helperText={isEmailError && 'Email invalid!'}
        disabled={validateEmailLoading}
      />

      <StyledFormControlLabel
        control={
          <Checkbox
            checked={agreedTerm}
            onChange={e => setAgreedTerm(e.target.checked)}
          />
        }
        label={
          <Typography className='agree-text'>
            I agree to the <strong>Term Of Service</strong> and{' '}
            <strong>Privacy Policy</strong>
          </Typography>
        }></StyledFormControlLabel>

      <StyledButton
        onClick={handleSubmit}
        disabled={isDisableContinue || validateEmailLoading}
        variant='contained'>
        {validateEmailLoading && (
          <CircularProgress size={16} style={{ marginRight: 10 }} />
        )}
        Continue
      </StyledButton>

      <Link
        style={{
          color: '#1976d2',
          textAlign: 'center',
          width: '100%',
          marginTop: 30,
          display: 'block',
          fontWeight: 700,
        }}
        to={PATHS.auth.signIn}>
        Sign In
      </Link>

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
