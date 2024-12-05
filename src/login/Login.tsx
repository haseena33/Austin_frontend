import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography, InputAdornment, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast notifications

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false); 

  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    // Clear previous error message
    setError('');

    // Validation logic
    if (!email || !password) {
      setError('Both fields are required.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/offlogin/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle success (navigate to the dashboard or store token)
        console.log('Login successful', data);
        toast.success('Login successful!', {
          position: "top-right",
          autoClose: 5000, // Optional: auto close after 5 seconds
          hideProgressBar: true,
          theme: "light"
        });
        setTimeout(()=>{
          navigate('/dashboard');

        },3000)
      } else {
        toast.error(data.detail || 'Login failed. Please try again.', {
          position: "top-center",
          autoClose: 5000, // Optional: auto close after 5 seconds
          hideProgressBar: true,
          theme: "light"
        });
        // Handle failure (show error message)
        setError(data.detail || 'Login failed. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        theme: "light"
      });
      // Handle network or server errors
      setError('An error occurred. Please try again later.');
      console.error('Error during login:', error);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Password"
          variant="outlined"
          type={passwordVisible ? "text" : "password"}
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setPasswordVisible(!passwordVisible)}  // Use IconButton here
                  edge="end"
                >
                  {passwordVisible ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {error && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Login
        </Button>
        <p>Don't have an account SignUp? <a href='/signup'>SignUp</a></p>
      </Box>
      <ToastContainer />
    </Container>
  );
}

export default LoginPage;
