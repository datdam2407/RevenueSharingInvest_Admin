import * as Yup from 'yup';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
// material

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  Grid,
  Stack,
  TextField,
  Button,
  Container,
  CircularProgress,
  Typography,
  Chip
} from '@mui/material';
// utils
// routes
// @types
//
import FirebaseService from 'api/firebase';
import { Business, TempBusiness } from '../../../../@types/krowd/business';
import { PATH_DASHBOARD } from 'routes/paths';
import Page from 'components/Page';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import axios from 'axios';
import { dispatch } from 'redux/store';
import { getBusinessList } from 'redux/slices/krowd_slices/business';
import { getUserKrowdList } from 'redux/slices/krowd_slices/users';
// ----------------------------------------------------------------------

export default function BusinessNewAccountForm() {
  const { pathname } = useLocation();
  const isCreate = pathname.includes('new');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const NewBusinessSchema = Yup.object().shape({});
  // const generatePassword = () => {
  //   // Create a random password
  //   const randomPassword = Math.random().toString(36).slice(2);

  //   // Set the generated password as state
  //   setPassword(randomPassword);
  //   setFieldValue('password', password);
  // };
  function getToken() {
    return window.localStorage.getItem('accessToken');
  }

  function getHeaderFormData() {
    const token = getToken();
    return { Authorization: `Bearer ${token}` };
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: '',
      lastName: '',
      email: ''
    },
    validationSchema: NewBusinessSchema,

    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        const headers = getHeaderFormData();
        await axios.post(
          `https://ec2-13-215-197-250.ap-southeast-1.compute.amazonaws.com/api/v1.0/users`,
          values,
          { headers: headers }
        );
        resetForm();
        setSubmitting(true);
        enqueueSnackbar('T???o m???i th??nh c??ng', {
          variant: 'success'
        });
        navigate(PATH_DASHBOARD.admin.listBusiness);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } =
    formik;
  return (
    <Page title="Doanh nghi???p: T???o m???i | Krowd">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading={'T???o m???i t??i kho???n doanh nghi???p'}
          links={[{ name: 'B???ng ??i???u khi???n', href: PATH_DASHBOARD.root }, { name: 'T???o m???i' }]}
        />
        <FormikProvider value={formik}>
          <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={6} md={4}></Grid>
              <Grid item xs={6} md={4}>
                <Card sx={{ p: 3 }}>
                  <Stack spacing={3}>
                    <Stack direction={{ xs: 'column', sm: 'column' }} spacing={{ xs: 3, sm: 2 }}>
                      <TextField
                        fullWidth
                        label="H???"
                        {...getFieldProps('firstName')}
                        error={Boolean(touched.firstName && errors.firstName)}
                        helperText={touched.firstName && errors.firstName}
                      />
                      <TextField
                        fullWidth
                        label="T??n"
                        {...getFieldProps('lastName')}
                        error={Boolean(touched.lastName && errors.lastName)}
                        helperText={touched.lastName && errors.lastName}
                      />
                      <TextField
                        fullWidth
                        label="?????a ch??? email"
                        {...getFieldProps('email')}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                      />
                    </Stack>
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                      <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                        T???o doanh nghi???p
                      </LoadingButton>
                    </Box>
                  </Stack>
                </Card>
              </Grid>
            </Grid>
          </Form>
        </FormikProvider>
      </Container>
    </Page>
  );
}
