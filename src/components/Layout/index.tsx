import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { AppBar, Typography } from '@mui/material';

const LayoutWrapper = styled.div`
  height: 100vh;
`;

const HeaderWrapper = styled.div`
  height: 56px;

  .MuiAppBar-positionStatic {
  }
`;

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <LayoutWrapper>
      <HeaderWrapper>
        <AppBar position='static'>
          <Typography
            variant='h5'
            noWrap
            sx={{
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              textAlign: 'center',
              lineHeight: '56px',
            }}>
            Pass3
          </Typography>
        </AppBar>
      </HeaderWrapper>
      <div>{children}</div>
    </LayoutWrapper>
  );
};

export default Layout;
