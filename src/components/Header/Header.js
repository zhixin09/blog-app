import React from 'react';
import { Typography, AppBar, Button, Toolbar, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import theme from '../../theme';

const Header = () => {
  return (
    <div>
      <AppBar sx={{ bgcolor: 'custom.dark' }} position="relative">
        <Toolbar>
          <IconButton size="large" sx={{ mr: 2, color: 'primary.main' }}>
            <FacebookIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, color: 'primary.main' }}>
            Zhixin's Blog
          </Typography>
          <Button variant="outlined">Sign In</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
