import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { login } = useAuth();

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
      login(values);
      alert('User registered successfully!');
    },
  });

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
          color: 'blue', // Text color inside the form container
          p: 3, 
          borderRadius: 1, 
          boxShadow: 3,
          textAlign: 'center',
        }}
      >
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
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#4caf50', // Default border color
                },
                '&:hover fieldset': {
                  borderColor: '#388e3c', // Border color on hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1b5e20', // Border color when focused
                },
              },
              '& .MuiInputLabel-root': {
                color: '#4caf50', // Label color
              },
              '& .MuiFormHelperText-root': {
                color: '#d32f2f', // Helper text color
              },
            }}
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
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#4caf50', // Default border color
                },
                '&:hover fieldset': {
                  borderColor: '#388e3c', // Border color on hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1b5e20', // Border color when focused
                },
              },
              '& .MuiInputLabel-root': {
                color: '#4caf50', // Label color
              },
              '& .MuiFormHelperText-root': {
                color: '#d32f2f', // Helper text color
              },
            }}
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
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#4caf50', // Default border color
                },
                '&:hover fieldset': {
                  borderColor: '#388e3c', // Border color on hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1b5e20', // Border color when focused
                },
              },
              '& .MuiInputLabel-root': {
                color: '#4caf50', // Label color
              },
              '& .MuiFormHelperText-root': {
                color: '#d32f2f', // Helper text color
              },
            }}
          />
          <Button color="primary" variant="contained" fullWidth type="submit">
            Register
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Register;
