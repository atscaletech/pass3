import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { createKey } from 'fastAuth';
import { useLogin, useValidateEmail } from '../hooks';

const CreateWallet = () => {
  const { onLogin } = useLogin();
  const { validateEmailSuccess } = useValidateEmail();
  
  const onCreateKey = async () => {
    if (validateEmailSuccess) {
      const { username, walletPublicKey } = await createKey(
        validateEmailSuccess,
      );
      onLogin({ username, walletPublicKey });
    }
  };

  return (
    <Box sx={{ paddingTop: 10 }}>
      <Typography
        variant='h5'
        component='h2'
        textAlign={'center'}
        fontWeight={'700'}>
        Create your wallet
      </Typography>

      <Typography variant='body1' component='p' mt={2}>
        By creating a wallet, a passkey is generated on your device and only
        stored on your devices and will never be shared with anyone.
      </Typography>

      <Button
        onClick={onCreateKey}
        style={{ marginTop: 40, width: '100%' }}
        variant='contained'>
        {false && <CircularProgress size={16} style={{ marginRight: 10 }} />}
        Create wallet
      </Button>
    </Box>
  );
};

export default CreateWallet;
