import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import '../Css/Login.css';  
const Login = () => {
  const { login, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();  

  // Use formik for form handling
  const formik = useFormik({
    initialValues: {
      email: location.state?.email || '',  
      password: location.state?.password || '',  
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Required'),
    }),
    onSubmit: (values) => {
      login(values);  
      if (!error) {
        navigate('/todos');  
      }
    },
  });


  const goToRegister = () => {
    navigate('/register');  
  };

  return (
    <Box className="login-container">
      <Box className="login-form-container">
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
            <Typography color="error" variant="body2" className="error-message">
              {error}
            </Typography>
          )}

          <Button color="primary" variant="contained" fullWidth type="submit" className="submit-button">
            Login
          </Button>

          {/* Add a "Go to Register" button */}
          <Button
            variant="outlined"
            fullWidth
            onClick={goToRegister}
            className="register-button"
          >
            Go to Register
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
