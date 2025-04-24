'use client'

import { ReactNode, useState } from 'react';

// material ui
import { Box, Button, CardHeader, CircularProgress, Container, Divider, FormHelperText, Grid, InputLabel, Stack, TextField, Typography } from '@mui/material';

// third party
import { Formik } from 'formik';
import * as Yup from 'yup';

// import project
import ProfileInfo from './ProfileInfo';
import useGetUser from '@/hooks/useGetUser';
import MainCard from '@/components/MainCard';

const Profile = () => {
  const user = useGetUser();

  const [custPhoto, setCustPhoto] = useState<string | File | Blob | undefined>(undefined);

  return (
    <Box>
      {/* row 1 */}
      <Box mb={1}>
        <Typography variant="h5">Profile</Typography>
      </Box>

      <Container maxWidth='md'>
        <Formik
          initialValues={{
            phone: '',
            address: ''
          }}
          validationSchema={Yup.object().shape({
            phone: Yup.string().max(255).required('No Hape harus diisi.'),
            address: Yup.string().max(255).required('Alamat harus diisi.'),
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          }}
        >
          {({ errors, isSubmitting, handleBlur, handleChange, handleSubmit, touched, values }) => {
            return (
              <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={3} sx={{ py: 2 }}>
                  <ProfileInfo
                    user={user}
                    custPhoto={custPhoto}
                    setCustPhoto={setCustPhoto}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                  />
                  <Grid item xs={12} md={9}>
                    <MainCard>
                      <CardHeader title="Informasi Personal" />
                      <Divider />
                      <Box sx={{ p: 2.5 }}>
                        <Grid container spacing={3}>
                          <Grid item xs={12}>
                            <Stack spacing={1.25}>
                              <InputLabel htmlFor="personal-first-name">No Hape</InputLabel>
                              <TextField
                                fullWidth
                                value={values.phone}
                                name="phone"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                placeholder="08***"
                                autoFocus
                              />
                              {touched.phone && errors.phone && (
                                <FormHelperText error id="personal-phone-helper">
                                  {errors.phone as ReactNode}
                                </FormHelperText>
                              )}
                            </Stack>
                          </Grid>

                          <Grid item xs={12}>
                            <Stack spacing={1.25}>
                              <InputLabel htmlFor="personal-first-name">Alamat</InputLabel>
                              <TextField
                                fullWidth
                                multiline
                                rows={3}
                                value={values.address}
                                name="address"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                placeholder="Alamat"
                                autoFocus
                              />
                              {touched.address && errors.address && (
                                <FormHelperText error id="personal-address-helper">
                                  {errors.address as ReactNode}
                                </FormHelperText>
                              )}
                            </Stack>
                          </Grid>
                        </Grid>

                        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mt: 2.5 }}>
                          {isSubmitting ? (
                            <Button
                              type="submit"
                              variant="contained"
                              color="secondary"
                              style={{ flexDirection: 'row', backgroundColor: isSubmitting ? "#dedede" : '', color: isSubmitting ? "#000" : "#fff" }}
                              disabled={isSubmitting}
                            >
                              <CircularProgress size={12} style={{ marginRight: 6 }} />
                              Save
                            </Button>
                          ) : (
                            <Button type="submit" variant="contained">
                              Save
                            </Button>
                          )}
                        </Stack>
                      </Box>
                    </MainCard>
                  </Grid>
                </Grid>
              </form>
            )
          }}
        </Formik>
      </Container>
    </Box>
  )
}

export default Profile