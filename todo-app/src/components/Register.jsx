import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { register, error } = useAuth();  // Get the error state from context
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Required'),
      name: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      register(values);  // Register the user
      // Check if there is an error (e.g., email already registered)
      if (!error) {
        // If no error, proceed with registration success
        alert('User registered successfully!');
        navigate('/login', { state: { email: values.email, password: values.password } });  // Pass email and password to login
      }
    },
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', width: '100vw', bgcolor: '#f0f0f0' }}>
      <Box sx={{ width: '100%', maxWidth: '500px', bgcolor: '#ffffff', p: 3, borderRadius: 1, boxShadow: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            id="name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
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

          {/* Display error message if the email is already registered */}
          {error && (
            <Typography color="error" variant="body2">
              {error === 'Email already registered'
                ? 'This email is already registered. Please login instead.'
                : error}
            </Typography>
          )}

          <Button color="primary" variant="contained" fullWidth type="submit">
            Register
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Register;
