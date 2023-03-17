import React from 'react';
import {
  Typography,
  AppBar,
  Button,
  Toolbar,
  Alert,
  Avatar,
  MenuItem,
  Menu,
  Box,
  IconButton,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import MenuIcon from '@mui/icons-material/Menu';
import { Container } from '@mui/system';
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
      title: 'About Me',
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
            }}
          >
            LIFE HACKER
          </Typography>
          <Box
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' }, gap: 1 }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                component={Link}
                to={page.path}
                sx={{ color: 'white' }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {currentUser == null ? (
              <Button component={Link} to="/login" variant="outlined">
                Sign In
              </Button>
            ) : (
              <>
                <Avatar>
                  {currentUser.displayName && currentUser.displayName.charAt(0)}
                </Avatar>
                <Typography variant="h6" mr={3}>
                  {currentUser.displayName}
                </Typography>
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
