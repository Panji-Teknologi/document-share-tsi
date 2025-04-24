'use client';

// material ui
import { FormHelperText, Grid, Stack, Typography } from '@mui/material';

// third-party
import { Formik } from 'formik';
import * as yup from 'yup';

// import project
import SingleFileUpload from '@/components/third-party/dropzone/SingleFile';
import MainCard from '@/components/MainCard';

const Upload = () => {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Upload</Typography>
      </Grid>

      <Grid item xs={12}>
        <MainCard title="Upload Dokumen Anda Disini">
          <Formik
            initialValues={{ files: null }}
            onSubmit={() => {
              // submit form
            }}
            validationSchema={yup.object().shape({
              files: yup.mixed().required('File is a required.')
            })}
          >
            {({ values, handleSubmit, setFieldValue, touched, errors }) => (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Stack spacing={1.5} alignItems="center">
                      <SingleFileUpload setFieldValue={setFieldValue} file={values.files} error={touched?.files && !!errors?.files} />
                      {touched.files && errors.files && (
                        <FormHelperText error id="standard-weight-helper-text-password-login">
                          {errors.files}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </MainCard>
      </Grid>
    </Grid>
  )
}

export default Upload