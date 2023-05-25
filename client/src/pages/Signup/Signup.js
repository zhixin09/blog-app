import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Container,
  Alert,
} from '@mui/material';
import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Signup = () => {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Password does not match!');
    }
    try {
      setError('');
      setLoading(true);
      //Asynchronous event
      await signup(
        usernameRef.current.value,
        emailRef.current.value,
        passwordRef.current.value
      );
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch {
      setError('Failed to create account');
    }
    setLoading(false);
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="93vh"
        sx={{ flexDirection: 'column' }}
      >
        <Typography variant="h4" fontWeight="bold">
          Sign up an account
        </Typography>
        <Container
          component="form"
          maxWidth="sm"
          sx={{ mt: 2, p: 2 }}
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {error && <Alert severity="error">{error}</Alert>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                inputRef={usernameRef}
                label="Username"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                inputRef={emailRef}
                label="Email Address"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                inputRef={passwordRef}
                label="Password"
                type="password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                inputRef={passwordConfirmRef}
                label="Confirm Password"
                type="password"
              />
            </Grid>
          </Grid>
          <Button
            disabled={loading}
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, mb: 2, py: 1 }}
          >
            Sign Up
          </Button>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Typography
              sx={{ textDecoration: 'none' }}
              component={Link}
              to="/login"
              variant="body2"
            >
              Already have an account? Sign in
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Signup;
