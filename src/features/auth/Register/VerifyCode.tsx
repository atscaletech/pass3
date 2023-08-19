import { Box, Button, Typography, CircularProgress } from '@mui/material';
import AuthCode from 'react-auth-code-input';
import styled from '@emotion/styled';
import { useVerifyCode } from '../hooks';
import { useState } from 'react';

const VerifyWrapper = styled(Box)`
  .verify-email-code {
    display: flex;

    input {
      width: 35px;
      height: 35px;
      padding: 0;
      font-size: 18px;
      text-align: center;
      margin-right: 12px;
      text-transform: uppercase;
      color: #494949;
      border: 1px solid #d6d6d6;
      border-radius: 4px;
      background: #fff;
      background-clip: padding-box;
    }

    input:focus {
      appearance: none;
      outline: 0;
      box-shadow: 0 0 0 3px rgb(131 192 253 / 50%);
    }
  }
`;

const VerifyEmail = ({
  goToEnterEmail,
  goToCreateWallet,
}: {
  goToEnterEmail: () => void;
  goToCreateWallet: () => void;
}) => {
  const { verifyCodeLoading, onVerifyCode } = useVerifyCode(goToCreateWallet);
  const [code, setCode] = useState('');

  const handleOnChange = (val: any) => {
    setCode(val);
  };

  const handleVerifyCode = () => {
    onVerifyCode(code);
  };

  return (
    <Box sx={{ paddingTop: 10 }}>
      <Typography
        variant='h5'
        component='h2'
        textAlign={'center'}
        fontWeight={'700'}>
        Verify your email
      </Typography>

      <Typography variant='body1' component='p' mt={2}>
        Please enter 6 digest code that has been sent to{' '}
        <strong>abc@gmail.com</strong>
      </Typography>

      <VerifyWrapper mt={4} display='flex' justifyContent={'center'}>
        <AuthCode
          containerClassName='verify-email-code'
          allowedCharacters='numeric'
          onChange={handleOnChange}
        />
      </VerifyWrapper>

      <Box
        display={'flex'}
        flexDirection={'column'}
        alignItems='center'
        mt={4}
        gap={2}>
        <Button
          disableFocusRipple
          disableTouchRipple
          style={{ textDecoration: 'underline' }}>
          Resend Code
        </Button>

        <Button
          disabled={code.length !== 6 || verifyCodeLoading}
          style={{ width: '100%' }}
          variant='contained'
          onClick={handleVerifyCode}>
          {verifyCodeLoading && (
            <CircularProgress size={16} style={{ marginRight: 10 }} />
          )}
          Continue
        </Button>

        <Button
          onClick={goToEnterEmail}
          disableRipple
          disableTouchRipple
          disableFocusRipple
          style={{ textDecoration: 'underline' }}>
          Change Email
        </Button>
      </Box>
    </Box>
  );
};

export default VerifyEmail;
