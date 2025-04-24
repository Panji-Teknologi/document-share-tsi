'use client';

import { Dispatch, MouseEvent, SetStateAction, useEffect, useState } from 'react';

// third-party
import { Formik } from 'formik';
import * as Yup from 'yup';
import NextLink from 'next/link';

// material ui
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, Grid, InputAdornment, InputLabel, Link, OutlinedInput, Stack, Typography } from '@mui/material'

// import project
import IconButton from '@/components/@extended/IconButton';
import AnimateButton from '@/components/@extended/AnimateButton';

import { openSnackbar } from '@/api/snackbar';
import { api } from '@/trpc/react';
import { strengthColor, strengthIndicator } from '@/utils/password-strength';

// assets
import { VisibilityOutlined, VisibilityOffOutlined, HighlightOffRounded } from '@mui/icons-material';

interface DialogAddUserProps {
  roles: { id: string; name: string; code: string }[] | undefined;
  title: string;
  role: string;
  openAddUser: boolean;
  setOpenAddUser: Dispatch<SetStateAction<boolean>>
}

const DialogAddUser = ({ roles, title, role, openAddUser, setOpenAddUser }: DialogAddUserProps) => {
  const utils = api.useUtils()

  const [level, setLevel] = useState<{ label: string, color: string }>({ label: '', color: '' });
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const { mutate: mutateProject } = api.project.createProject.useMutation()

  const { mutate: mutateRootFolder } = api.folder.createFolder.useMutation({
    onSuccess: (data) => {
      utils.folder.getRootFolder.invalidate();
      utils.folder.getAll.invalidate();

      mutateProject({ folderId: data.id });
    },
    onError: () => {
      openSnackbar({
        open: true,
        message: error?.message,
        variant: 'alert',
        alert: {
          color: 'error'
        }
      });
    }
  })

  const { mutate: mutateSignup, error } = api.register.register.useMutation({
    onSuccess: (response) => {
      openSnackbar({
        open: true,
        message: 'Signup success!',
        variant: 'alert',
        alert: {
          color: 'success'
        }
      });

      if (role === 'client') {
        mutateRootFolder({
          isRoot: true,
          name: 'Root Folder',
          userId: response.id,
          startDate: new Date(),
          endDate: new Date(),
        })
      }

      utils.user.getAuditors.invalidate();
      utils.user.getClients.invalidate();

      handleClose();
    },
    onError: () => {
      openSnackbar({
        open: true,
        message: error?.message,
        variant: 'alert',
        alert: {
          color: 'error'
        }
      });
    }
  })

  useEffect(() => {
    changePassword('');
  }, []);

  const handleClose = () => {
    setOpenAddUser(false);
  }

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const changePassword = (value: string) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(Number(temp)));
  };

  return (
    <Dialog maxWidth='xs' open={openAddUser}>
      <Box sx={{ p: 1 }}>
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          <DialogTitle>{title}</DialogTitle>
          <IconButton color='secondary' sx={{ mr: 2 }} onClick={handleClose}>
            <HighlightOffRounded />
          </IconButton>
        </Stack>

        <DialogContent>
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
              submit: null
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().max(255).required('Name is required'),
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={async (values, { setErrors, setSubmitting }) => {
              const { email, name, password } = values;
              const roleId = roles?.find((item) => item?.code === role)?.id as string;

              mutateSignup({ email, name, password, roleId })
            }}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
              <form noValidate onSubmit={handleSubmit}>
                <input type="hidden" />
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="name-login">
                        {role === 'auditor' ? 'Auditor Name' : 'Company/Institution Name'}
                      </InputLabel>
                      <OutlinedInput
                        id="name-login"
                        type="text"
                        value={values.name}
                        name="name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        fullWidth
                        error={Boolean(touched.name && errors.name)}
                      />
                    </Stack>
                    {touched.name && errors.name && (
                      <FormHelperText error id="standard-weight-helper-text-name-login">
                        {errors.name}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="email-login">Email Address</InputLabel>
                      <OutlinedInput
                        id="email-login"
                        type="email"
                        value={values.email}
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter email address"
                        fullWidth
                        error={Boolean(touched.email && errors.email)}
                      />
                    </Stack>
                    {touched.email && errors.email && (
                      <FormHelperText error id="standard-weight-helper-text-email-login">
                        {errors.email}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="password-login">Password</InputLabel>
                      <OutlinedInput
                        fullWidth
                        error={Boolean(touched.password && errors.password)}
                        id="-password-login"
                        type={showPassword ? 'text' : 'password'}
                        value={values.password}
                        name="password"
                        onBlur={handleBlur}
                        onChange={(e) => {
                          handleChange(e);
                          changePassword(e.target.value);
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              color="secondary"
                            >
                              {showPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                            </IconButton>
                          </InputAdornment>
                        }
                        placeholder="Enter password"
                      />
                    </Stack>
                    {touched.password && errors.password && (
                      <FormHelperText error id="standard-weight-helper-text-password-login">
                        {errors.password}
                      </FormHelperText>
                    )}
                    <FormControl fullWidth sx={{ mt: 2 }}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item>
                          <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                        </Grid>
                        <Grid item>
                          <Typography variant="subtitle1" fontSize="0.75rem">
                            {level?.label}
                          </Typography>
                        </Grid>
                      </Grid>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sx={{ mt: -1 }}>
                    <Typography variant="body2">
                      By Signing up, you agree to our &nbsp;
                      <NextLink href="/" passHref legacyBehavior>
                        <Link variant="subtitle2">Terms of Service</Link>
                      </NextLink>
                      &nbsp; and &nbsp;
                      <NextLink href="/" passHref legacyBehavior>
                        <Link variant="subtitle2">Privacy Policy</Link>
                      </NextLink>
                    </Typography>
                  </Grid>
                  {errors.submit && (
                    <Grid item xs={12}>
                      <FormHelperText error>{errors.submit}</FormHelperText>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <AnimateButton>
                      <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                        Create Account
                      </Button>
                    </AnimateButton>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Box>
    </Dialog>
  )
}

export default DialogAddUser;