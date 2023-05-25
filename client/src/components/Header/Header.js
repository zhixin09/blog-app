import React from 'react';
import {
  Typography,
  AppBar,
  Button,
  Toolbar,
  Alert,
  Avatar,
  Box,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
  const { logout, currentUser } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const pages = [
    {
      title: 'Create',
      path: '/create',
    },
    {
      title: 'About',
      path: '/about',
    },
    {
      title: 'Contact',
      path: '/contact',
    },
  ];
  // const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      setError('');
      await logout();
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch {
      setError('Logout failed!');
    }
  };
  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <IconButton size="large" edge="start">
            <MenuIcon sx={{ color: 'white', mr: 2 }} />
          </IconButton>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              display: { xs: 'none', sm: 'block' },
              textDecoration: 'none',
              color: 'white',
              mr: 4,
              fontWeight: 700,
            }}
          >
            LIFE HACKER
          </Typography>
          <Box
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' }, gap: 1 }}
          >
            {pages.map((page, id) => (
              <Button
                key={id}
                component={Link}
                to={page.path}
                sx={{ color: 'white', fontWeight: 600 }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {currentUser == null ? (
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                color="custom"
              >
                Sign In
              </Button>
            ) : (
              <>
                <Tooltip
                  title={
                    <>
                      <Typography variant="body1" mr={3}>
                        {currentUser.displayName}
                      </Typography>
                      <Typography variant="body2" mr={3}>
                        {currentUser.email}
                      </Typography>
                    </>
                  }
                >
                  <IconButton>
                    <Avatar>
                      {currentUser.displayName &&
                        currentUser.displayName.charAt(0)}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  // anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={false}
                  // onClose={handleCloseUserMenu}
                >
                  <MenuItem>
                    <Typography textAlign="center">Account</Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography textAlign="center">Settings</Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>

                <Button
                  onClick={handleLogout}
                  variant="outlined"
                  color="custom"
                >
                  Log Out
                </Button>
              </>
            )}
          </Box>
          {error && <Alert severity="error">{error}</Alert>}
          {/* <Menu>
              {pages.map((page) => (
                <MenuItem key={page} component={Link} to={page.path}>
                  <Typography variant="h6">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu> */}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
