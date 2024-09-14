import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();  // Get location to check if data is passed

  // Use formik for form handling
  const formik = useFormik({
    initialValues: {
      email: location.state?.email || '',  // Pre-fill if email is passed from registration
      password: location.state?.password || '',  // Pre-fill if password is passed
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Required'),
    }),
    onSubmit: (values) => {
      login(values);  // Perform login
      if (!error) {
        navigate('/todos');  // Redirect to todos after successful login
      }
    },
  });

  // Function to handle navigation to register page
  const goToRegister = () => {
    navigate('/register');  // Redirect to register page
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh', 
        width: '100vw',
        bgcolor: '#f0f0f0'  // Match the outer background color
      }}
    >
      <Box 
        sx={{ 
          width: '100%', 
          maxWidth: '500px', 
          bgcolor: '#ffffff', // Form container background color
          color: '#000', // Text color inside the form container
          p: 3, 
          borderRadius: 1, 
          boxShadow: 3,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            margin="normal"
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          {/* Display error message if login fails */}
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}

          <Button color="primary" variant="contained" fullWidth type="submit" sx={{ mt: 2 }}>
            Login
          </Button>

          {/* Add a "Go to Register" button */}
          <Button
            variant="outlined"
            fullWidth
            onClick={goToRegister}
            sx={{ mt: 2 }}
          >
            Go to Register
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
