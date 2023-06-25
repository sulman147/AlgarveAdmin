import React, { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "axios";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

const LoginForm = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios
        .post(
          "http://server.cashbackforever.net:5500/api/admin/login",
          formData
        )
        .then((response) => {
          // Handle success response

          if (response.data.success) {
            toastr.success("Login Successfully");
            localStorage.setItem("isauthenticated", response.data.success);
            localStorage.setItem("accessToken", response.data.data.accessToken);
            localStorage.setItem("email", response.data.data.email);
            localStorage.setItem("firstName", response.data.data.first_name);
            localStorage.setItem("lastName", response.data.data.last_name);
            localStorage.setItem("username", response.data.data.username);
            window.location.href = "http://algarve.zappta-launch.com/";
          } else {
            toastr.error(response.data.message);
          }
        })
        .catch((error) => {
          // Handle error response
          toastr.error("Login Fail");
        });
    }
  };

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    // Username validation
    if (!formData.username) {
      formIsValid = false;
      errors.username = "Username is required";
    }

    // Password validation
    if (!formData.password) {
      formIsValid = false;
      errors.password = "Password is required";
    }

    setErrors(errors);
    return formIsValid;
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="70vh"
      borderRadius="20"
    >
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              name="username"
              variant="outlined"
              value={formData.username}
              onChange={handleChange}
              error={!!errors.username}
              helperText={errors.username}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password"
              name="password"
              variant="outlined"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              fullWidth
              margin="normal"
              type="password"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginForm;
