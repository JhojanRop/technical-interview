import { Alert, Box, Button, CircularProgress, TextField } from '@mui/material';
import { loginUser } from '@/services/auth';
import { useState } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function LoginForm ({ onSuccess }) {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const data = await loginUser(formData);
      onSuccess(data.token, data.user);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Box className="space-y-4">
        {error && (
          <Alert severity="error" onClose={() => setError('')}>
            {error.status === 401 ? 'Invalid credentials' : error.message}
          </Alert>
        )}

        <TextField
          required
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onInput={(e) => handleInputChange(e)}
          variant="outlined"
          sx={{ bgcolor: "white" }}
        />

        <TextField
          required
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onInput={(e) => handleInputChange(e)}
          variant="outlined"
          sx={{ bgcolor: "white" }}
        />

        <Button
          fullWidth
          variant="contained"
          type="submit"
          disabled={isLoading}
          endIcon={isLoading ? <CircularProgress size={20} /> : <ArrowForwardIcon />}
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </Button>
      </Box>
    </form>
  );
};
