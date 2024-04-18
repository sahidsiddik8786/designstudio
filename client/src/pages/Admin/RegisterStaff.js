import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Typography, Container, Grid, Card, CardContent } from '@material-ui/core';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoBackButton from '../../components/layout/goback';
import Layout from "../../components/layout/Layout";
import StaffHeader from "../Staff/StaffHeader";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: 'url("https://media.istockphoto.com/id/1428737062/photo/empty-wooden-table-top-with-lights-bokeh-on-blur-restaurant-background.jpg?s=612x612&w=0&k=20&c=7A8ULpWj0zOiSEaQC_PH6Ef6YbzRYW_PkZjR0xhwfEk=")',
    backgroundSize: 'cover',
    backgroundPosition: 'fixed',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  card: {
    background: 'hsla(, 0%, 100%, 0.75)',
    backdropFilter: 'blur(30px)',
    padding: theme.spacing(4),
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: theme.spacing(2),
  },
}));

const AddStaffMember = () => {
  
  const classes = useStyles();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    address: '',
    streetaddress: '',
    city: '',
    state: '',
    postal: '',
    country: '',
    email: '',
    password: '',
    phone: '',
    expertin: '',
  });

  const [formErrors, setFormErrors] = useState({
    firstname: '',
    lastname: '',
    address: '',
    streetaddress: '',
    city: '',
    state: '',
    postal: '',
    country: '',
    email: '',
    password: '',
    phone: '',
    expertin: '',

  });

  const [passwordStrength, setPasswordStrength] = useState("weak");
  const handleWhitespaceValidation = (value) => {
    if (value.trim() !== value) {
      toast.dismiss();
      toast.error("Leading or trailing whitespace is not allowed.");
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = '';
  
    switch (name) {
      case 'firstname':
      case 'lastname':
        if (!value.match(/^[a-zA-Z]+$/)) {
          errorMessage = 'Invalid name. Only alphabetic characters are allowed.';
        } else if (!handleWhitespaceValidation(value)) {
          errorMessage = 'Leading or trailing whitespace is not allowed.';
        }
        break;
      case 'address':
      case 'streetaddress':
      case 'city':
      case 'state':
      case 'country':
      case 'expertin':
        errorMessage = value.trim() === '' ? 'This field is required.' : '';
        break;
      case 'postal':
        errorMessage = !value.match(/^\d{6}$/) ? 'Postal code must be 6 digits.' : '';
        break;
      case 'email':
        errorMessage = !/\S+@\S+\.\S+/.test(value) ? 'Invalid email address.' : '';
        break;
      case 'password':
        errorMessage = value.length < 6 ? 'Password must be at least 6 characters long.' : '';
        const handlePasswordStrength = (value) => {
          const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
          if (passwordPattern.test(value)) {
            setPasswordStrength("strong");
          } else if (value.length >= 8) {
            setPasswordStrength("moderate");
            toast.dismiss();
            toast.error(
              "Password is too weak. It should contain at least one letter and one number."
            );
          } else {
            setPasswordStrength("weak");
            toast.dismiss();
            toast.error(
              "Password is too weak. It should contain at least one letter and one number."
            );
          }
        };
        break;
      case 'phone':
        errorMessage = !value.match(/^\d{10}$/) ? 'Phone number must be 10 digits.' : '';
        if (/0{10}/.test(value)) {
          errorMessage = "Phone number cannot contain 10 consecutive zeros.";
        }
        break;
      default:
        break;
    }
  
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: errorMessage });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasErrors = Object.values(formErrors).some(error => error !== '');

    if (hasErrors) {
      toast.error('Please fill in all required fields correctly.');
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/v1/staff/create-staff', formData);
      toast.success('Staff member added successfully!');

      // Sending registration confirmation email
      await axios.post('http://localhost:8080/api/v1/staff/send-registration-email', { email: formData.email });

      setFormData({
        firstname: '',
        lastname: '',
        address: '',
        streetaddress: '',
        city: '',
        state: '',
        postal: '',
        country: '',
        email: '',
        password: '',
        phone: '',
        expertin: '',

      });


    } catch (error) {
      console.error('Error adding staff member:', error);
      toast.error('Error adding staff member. Please try again.');
    }
  };

  return (
    <>
      <StaffHeader/>
      <div className={classes.root}>
      <Container maxWidth="sm" className={classes.formContainer} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '70vh' }}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h4" align="center" gutterBottom>
             Sign Up Staff
              </Typography>
              <GoBackButton />
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField label="First Name" name="firstname" fullWidth value={formData.firstname} onChange={handleChange} required error={!!formErrors.firstname} helperText={formErrors.firstname} 
                  
                  
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Last Name" name="lastname" fullWidth value={formData.lastname} onChange={handleChange} required error={!!formErrors.lastname} helperText={formErrors.lastname} />
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Address" name="address" fullWidth value={formData.address} onChange={handleChange} required error={!!formErrors.address} helperText={formErrors.address} />
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Street Address" name="streetaddress" fullWidth value={formData.streetaddress} onChange={handleChange} required error={!!formErrors.streetaddress} helperText={formErrors.streetaddress} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField label="City" name="city" fullWidth value={formData.city} onChange={handleChange} required error={!!formErrors.city} helperText={formErrors.city} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField label="State" name="state" fullWidth value={formData.state} onChange={handleChange} required error={!!formErrors.state} helperText={formErrors.state} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField label="Country" name="country" fullWidth value={formData.country} onChange={handleChange} required error={!!formErrors.country} helperText={formErrors.country} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Postal Code" name="postal" fullWidth value={formData.postal} onChange={handleChange} required error={!!formErrors.postal} helperText={formErrors.postal} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField type="email" label="Email" name="email" fullWidth value={formData.email} onChange={handleChange} required error={!!formErrors.email} helperText={formErrors.email} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField type="password" label="Password" name="password" fullWidth value={formData.password} onChange={handleChange} required error={!!formErrors.password} helperText={formErrors.password} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField type="tel" label="Phone" name="phone" fullWidth value={formData.phone} onChange={handleChange} required error={!!formErrors.phone} helperText={formErrors.phone} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField type="tel" label="Expert In " name="expertin" fullWidth value={formData.expertin} onChange={handleChange} required error={!!formErrors.expertin} helperText={formErrors.expertin} />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Register Staff
                  </Button>
                </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Container>
        <ToastContainer />
      </div>
    </>
  );
};

export default AddStaffMember;
