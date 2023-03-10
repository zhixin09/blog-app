import React from 'react';
import {
  Typography,
  AppBar,
  Button,
  Toolbar,
  Alert,
  Avatar,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Container } from '@mui/system';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
  const { logout, currentUser } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const navItems = [
    {
      title: 'Home',
      path: '/',
    },
    {
      title: 'Add Post',
      path: '/create',
    },
    {
      title: 'Projects',
      path: '/projects',
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
          <Container
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Container
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '33.33%',
                gap: 20,
              }}
            >
              <FacebookIcon fontSize="large" />
              <Typography variant="h6">L O G O</Typography>
            </Container>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                width: '33.33%',
              }}
            >
              {navItems.map((item, index) => (
                <Button
                  key={index}
                  component={Link}
                  to={item.path}
                  color="custom"
                >
                  <Typography variant="h6">{item.title}</Typography>
                </Button>
              ))}
            </div>
            <div
              style={{
                width: '33.33%',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
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
                <Container
                  sx={{
                    display: 'flex',
                    gap: 2,
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Avatar>
                    {currentUser.displayName &&
                      currentUser.displayName.charAt(0)}
                  </Avatar>
                  <Typography>{currentUser.displayName}</Typography>
                  <Button
                    onClick={handleLogout}
                    variant="outlined"
                    color="custom"
                  >
                    Log Out
                  </Button>
                </Container>
              )}
              {error && <Alert severity="error">{error}</Alert>}
            </div>
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
