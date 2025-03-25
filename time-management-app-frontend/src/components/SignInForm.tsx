import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Alert, Link } from '@mui/material';
import { login } from '../apis/auth';

const SignInForm: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate inputs
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    // Simulate login
    const result = login(email, password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message || 'Login failed');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSignIn}
      sx={{
        my: 8,
        mx: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
        Sign In
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Sign In
      </Button>
      
      <Box sx={{ width: '100%', textAlign: 'center' }}>
        <Link 
          component="button"
          variant="body2" 
          onClick={() => navigate('/signup')}
        >
          {"Don't have an account? Sign Up"}
        </Link>
        <Box sx={{ mt: 2 }}>
          <Link 
            component="button"
            variant="body2" 
            onClick={() => navigate('/')}
          >
            Back to Welcome
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default SignInForm;
