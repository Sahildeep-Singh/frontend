import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Container } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import GetLocation from "./GetLocation";
import { API } from "../config/api";

const RegistrationForm = ({ onLoginClick, setIsLogin }) => {
  const navigate = useNavigate();
  const [profilePhoto, setProfilePhoto] = useState(null);

  const userLocation = GetLocation();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      mobile: "",
      zipCode: "",
      profile: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      name: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
      phone: Yup.string().optional(),
      mobile: Yup.string().required("Required"),
      zipCode: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        if (profilePhoto) {
          values.profile = profilePhoto;
        } else delete values.profile;

        if (userLocation.latitude && userLocation.longitude) {
          values.lat = userLocation.latitude;
          values.long = userLocation.longitude;
        }

        // Make a POST request to your API endpoint
        const response = await axios.post(
          API.API_BASE_URL + API.REGISTER,
          values
        );

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
        console.error("Error during registration:", error);
      }
    },
  });

  // Dropzone configuration
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      // Update state with the selected file
      uploadFile(acceptedFiles[0]);
    },
  });

  const uploadFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("path", "profile");

      const response = await axios.post(
        API.API_BASE_URL + API.UPLOAD,
        formData
      );

      if (response.status === 201) {
        setProfilePhoto(response?.data?.data);
      }
    } catch (error) {
      // Handle any network or server errors
      console.error("Error during uploadFile:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          {...formik.getFieldProps("name")}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
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
        <TextField
          label="Phone Number"
          fullWidth
          margin="normal"
          {...formik.getFieldProps("phone")}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
        />
        <TextField
          label="Mobile Number"
          fullWidth
          margin="normal"
          {...formik.getFieldProps("mobile")}
          error={formik.touched.mobile && Boolean(formik.errors.mobile)}
          helperText={formik.touched.mobile && formik.errors.mobile}
        />
        <TextField
          label="Zip Code"
          fullWidth
          margin="normal"
          {...formik.getFieldProps("zipCode")}
          error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
          helperText={formik.touched.zipCode && formik.errors.zipCode}
        />
        <div
          {...getRootProps()}
          style={{
            marginTop: "16px",
            border: "2px dashed #e0e0e0",
            padding: "16px",
            textAlign: "center",
          }}
        >
          <input {...getInputProps()} />
          <Typography variant="body2">
            Drag & drop or click to select a profile photo
          </Typography>
          {profilePhoto && (
            <Typography variant="body2">{profilePhoto.name}</Typography>
          )}
        </div>
        <Button variant="contained" color="primary" type="submit">
          Register
        </Button>
      </form>
      <Button onClick={() => onLoginClick(true)} style={{ marginTop: "16px" }}>
        Already have an account? Login
      </Button>
    </Container>
  );
};

export default RegistrationForm;
