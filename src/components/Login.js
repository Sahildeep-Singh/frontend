import React from "react";
import { TextField, Button, Typography, Container } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";

const LoginForm = ({ onLoginClick, setIsLogin }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        // Make a POST request to your API endpoint
        const response = await axios.post(API.API_BASE_URL + API.LOGIN, values);

        // Check if the response is successful
        if (response.data?.statusCode === 200) {
          setIsLogin(true);
          // Redirect to the home page or perform other actions
          Swal.fire({
            icon: "success",
            title: response.data?.message,
            text: "You can now login with your credentials.",
          });

          localStorage.setItem("token", response.data?.data?.token);
          navigate("/home");

          console.log("Registration successful");
        } else {
          Swal.fire({
            icon: "error",
            title: response.data?.message,
            text: "Please try again later.",
          });
        }
      } catch (error) {
        // Handle any network or server errors
        console.error("Error during login:", error);
      }
    },
  });

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          {...formik.getFieldProps("email")}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          {...formik.getFieldProps("password")}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
      </form>
      <Button onClick={() => onLoginClick(false)} style={{ marginTop: "16px" }}>
        New User ? Register
      </Button>
    </Container>
  );
};

export default LoginForm;
