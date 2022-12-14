import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment,TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
import {useMutation} from "@tanstack/react-query";
import {useDispatch} from "react-redux";
import {loginUser, setAuthenticated, setResponse, setUser} from "../../../app/slices/userSlice";
import {signInUser} from "../../../actions";
import {Form, FormikProvider, useFormik} from "formik";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            remember: true,
        },
        validationSchema: LoginSchema,
        onSubmit: (values) => {
            const {email, password} = values
            // navigate('/dashboard/app', { replace: true });


            const userData = JSON.stringify({
                "email": email,
                "password": password
            })
            mutate(userData)
        },
    });

    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps, setSubmitting } = formik;


const {isError, isLoading, mutate} = useMutation(['login-user'],signInUser,{
    onSuccess:(data)=>{
        if(data.success) {

            localStorage.setItem('admin-Token', JSON.stringify(data.data.token));

            dispatch(setUser(data.data))
            dispatch(setAuthenticated(true))
        }else{
            dispatch(setResponse({
                responseMessage:data.error.message,
                responseState:true,
                responseType:'error',
            }))
        }
    }
} )
    const handleShowPassword = () => {
        setShowPassword((show) => !show);
    };


  return (
    <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Stack spacing={3}>

          <TextField
              fullWidth
              autoComplete="email"
              type="email"
              label="Email address"
              {...getFieldProps('email')}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
          />
          <TextField

              fullWidth
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              {...getFieldProps('password')}
              InputProps={{
                  endAdornment: (
                      <InputAdornment position="end">
                          <IconButton onClick={handleShowPassword} edge="end">
                              <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                          </IconButton>
                      </InputAdornment>
                  ),
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
          />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>

      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isLoading}>
        Login
      </LoadingButton>
        </Form>
    </FormikProvider>
  );
}
