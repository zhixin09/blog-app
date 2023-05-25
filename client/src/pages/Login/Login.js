import {
  Typography,
  Button,
  Grid,
  TextField,
  Box,
  Container,
  Alert,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useRef, useState } from 'react';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { loginWithGmail, loginWithEmail, currentUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const signInWithGoogle = async () => {
    await loginWithGmail();
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      //Asynchronous event
      await loginWithEmail(emailRef.current.value, passwordRef.current.value);
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch {
      setError('Email or Password is incorrect!');
    }
    setLoading(false);
  };
  return (
    <div>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="93vh"
        sx={{ flexDirection: 'column' }}
      >
        <Typography variant="h4" fontWeight="bold">
          Login
        </Typography>
        <Container
          component="form"
          onSubmit={handleSubmit}
          maxWidth="sm"
          sx={{ mt: 5, p: 2 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {error && <Alert severity="error">{error}</Alert>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Email Address"
                inputRef={emailRef}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                type="password"
                label="Password"
                inputRef={passwordRef}
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
            Login
          </Button>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              sx={{ textDecoration: 'none' }}
              component={Link}
              to="#"
              variant="body2"
            >
              Forgot password?
            </Typography>
            <Typography
              sx={{ textDecoration: 'none' }}
              component={Link}
              to="/signup"
              variant="body2"
            >
              Don't have an account? Sign Up
            </Typography>
          </Box>
          <Box
            sx={{
              mt: 5,
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Typography variant="h6">
              Sign In With Google to Continue
            </Typography>
            <Button variant="outlined" onClick={signInWithGoogle}>
              <GoogleIcon fontSize="large" sx={{ mr: 2 }} />
              <Typography fontWeight="bold">Login with Google</Typography>
            </Button>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default Login;
