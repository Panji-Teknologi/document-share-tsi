// material-ui
import { alpha } from '@mui/material/styles';
import { Box, Paper, Typography } from '@mui/material';

import { FileRejection } from 'react-dropzone';

// utils
import getDropzoneData from '@/utils/getDropzoneData';

// ==============================|| DROPZONE - REJECTION FILES ||============================== //

interface RejectionFilesProps {
  fileRejections: FileRejection[]
}

export default function RejectionFiles({ fileRejections }: RejectionFilesProps) {
  return (
    <Paper
      variant="outlined"
      sx={{
        py: 1,
        px: 2,
        mt: 3,
        borderColor: 'error.light',
        bgcolor: (theme) => alpha(`${theme.palette.error.main}`, 0.08)
      }}
    >
      {fileRejections.map(({ file, errors }, index) => {
        const { path, size } = getDropzoneData(file, index);

        return (
          <Box key={path} sx={{ my: 1 }}>
            <Typography variant="subtitle2" noWrap>
              {path} - {size ? size : ''}
            </Typography>

            {errors.map((error) => (
              <Box key={error.code} component="li" sx={{ typography: 'caption' }}>
                {error.message}
              </Box>
            ))}
          </Box>
        );
      })}
    </Paper>
  );
};
