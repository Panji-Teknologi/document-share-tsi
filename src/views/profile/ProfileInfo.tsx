/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */

import { ChangeEvent, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';

// material ui
import { Box, FormHelperText, FormLabel, Grid, Stack, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project import
import MainCard from '@/components/MainCard'
import Avatar from '@/components/@extended/Avatar'

// type
import { UserType } from '@/utils/types';

// assets
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';

// ==============================|| Profile Info ||============================== //
interface ProfileInfoProps {
  user: UserType | null
  custPhoto?: any
  setCustPhoto?: Dispatch<SetStateAction<any>>
  errors?: any
  touched?: any
  handleChange?: any
}

const ProfileInfo = ({ user, custPhoto, setCustPhoto, errors, touched, handleChange }: ProfileInfoProps) => {
  const theme = useTheme();

  const [avatar, setAvatar] = useState<string>('');

  useEffect(() => {
    if (custPhoto?.name) {
      setAvatar(URL?.createObjectURL(custPhoto));
    }
  }, [custPhoto]);

  return (
    <Grid item xs={12} md={3}>
      <MainCard>
        <Stack spacing={2.5} alignItems="center">
          <FormLabel
            htmlFor="change-avtar"
            sx={{
              position: 'relative',
              borderRadius: '50%',
              overflow: 'hidden',
              '&:hover .MuiBox-root': { opacity: 1 },
              cursor: 'pointer'
            }}
          >
            {/* {user?.cust_photo || avatar ? (
                  <img src={!avatar ? `https://jit-assets.manajemensistem.com/customer/profile_photo/${user?.cust_photo}` : avatar} style={{ width: 124, height: 124, borderRadius: 100 }} />
                ) : (
                  <Avatar alt={user?.cust_photo} sx={{ width: 124, height: 124, border: '1px dashed' }} />
                )} */}
            <Avatar alt={custPhoto} sx={{ width: 124, height: 124, border: '1px dashed' }} />

            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                backgroundColor: 'rgba(0,0,0,.65)',
                width: '100%',
                height: '100%',
                opacity: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Stack spacing={0.5} alignItems="center">
                <CameraAltRoundedIcon style={{ color: theme.palette.secondary.lighter, fontSize: '2rem' }} />
                <Typography sx={{ color: 'secondary.lighter' }}>Upload</Typography>
              </Stack>
            </Box>

          </FormLabel>
          <TextField
            type="file"
            id="change-avtar"
            placeholder="Outlined"
            variant="outlined"
            sx={{ display: 'none' }}
            name="cust_photo"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setCustPhoto?.(e?.currentTarget?.files?.[0])
              handleChange({
                currentTarget: {
                  name: 'cust_photo',
                  value: e.currentTarget?.files?.[0]
                }
              })
            }}
          />
          {touched.cust_photo && errors.cust_photo && (
            <FormHelperText error id="personal-cust_photo-helper">
              {errors.cust_photo as ReactNode}
            </FormHelperText>
          )}

          <Stack spacing={0.5} alignItems="center">
            <Typography variant="h5">{user?.name}</Typography>
            <Typography color="secondary">{user?.email}</Typography>
          </Stack>
        </Stack>
      </MainCard>
    </Grid>
  )
}

export default ProfileInfo