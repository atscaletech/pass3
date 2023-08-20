import { Container, Box, Typography } from '@mui/material';
import { useAuthState } from 'features/auth/hooks';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PATHS from 'router/paths';

const Dashboard = () => {
  const { username, walletPublicKey } = useAuthState();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!username) {
      navigate(PATHS.auth.register);
    }
  }, [username, navigate]);
  return (
    <Container>
      <Box mt={5}>
        <Typography>Welcome: {username} </Typography>
        <Typography style={{ wordBreak: 'break-all' }}>
          Wallet PublicKey: {walletPublicKey}{' '}
        </Typography>
      </Box>
    </Container>
  );
};

export default Dashboard;
