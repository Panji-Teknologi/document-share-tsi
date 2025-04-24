import { SyntheticEvent } from 'react';

// material-ui
import { Alert, Button, Fade, Grow, GrowProps, Slide, SlideProps } from '@mui/material';
import MuiSnackbar from '@mui/material/Snackbar';
import { SnackbarCloseReason } from '@mui/base';

// project import
import IconButton from './IconButton';
import { closeSnackbar, useGetSnackbar } from '@/api/snackbar';

// assets
import { HighlightOffRounded } from '@mui/icons-material';

// animation function
function TransitionSlideLeft(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

function TransitionSlideUp(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

function TransitionSlideRight(props: SlideProps) {
  return <Slide {...props} direction="right" />;
}

function TransitionSlideDown(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}

function GrowTransition(props: GrowProps) {
  return <Grow {...props} />;
}

// animation options
const animation = {
  SlideLeft: TransitionSlideLeft,
  SlideUp: TransitionSlideUp,
  SlideRight: TransitionSlideRight,
  SlideDown: TransitionSlideDown,
  Grow: GrowTransition,
  Fade
};

// ==============================|| SNACKBAR ||============================== //

const Snackbar = () => {
  const { snackbar } = useGetSnackbar();

  const handleClose = (event: Event | SyntheticEvent<any, Event>, reason: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    closeSnackbar();
  };

  return (
    <>
      {/* default snackbar */}
      {snackbar?.variant === 'default' && (
        <MuiSnackbar
          anchorOrigin={snackbar.anchorOrigin}
          open={snackbar.open}
          autoHideDuration={1500}
          onClose={handleClose}
          message={snackbar.message}
          TransitionComponent={animation[snackbar?.transition]}
          action={
            <>
              <Button color="secondary" size="small" onClick={() => handleClose}>
                UNDO
              </Button>
              <IconButton size="small" aria-label="close" color="inherit" onClick={() => handleClose} sx={{ mt: 0.25 }}>
                <HighlightOffRounded />
              </IconButton>
            </>
          }
        />
      )}
      {/* alert snackbar */}
      {snackbar?.variant === 'alert' && (
        <MuiSnackbar
          TransitionComponent={animation[snackbar.transition]}
          anchorOrigin={snackbar.anchorOrigin}
          open={snackbar.open}
          autoHideDuration={1500}
          onClose={handleClose}
        >
          <Alert
            variant={snackbar.alert.variant}
            color={snackbar.alert.color}
            action={
              <>
                {snackbar.actionButton !== false && (
                  <Button color={snackbar.alert.color} size="small" onClick={() => handleClose}>
                    UNDO
                  </Button>
                )}
                {snackbar.close && (
                  <IconButton
                    sx={{ mt: 0.25 }}
                    size="small"
                    aria-label="close"
                    variant="contained"
                    color={snackbar.alert.color}
                    onClick={() => handleClose}
                  >
                    <HighlightOffRounded />
                  </IconButton>
                )}
              </>
            }
            sx={{
              ...(snackbar.alert.variant === 'outlined' && {
                bgcolor: 'grey.0'
              })
            }}
          >
            {snackbar.message}
          </Alert>
        </MuiSnackbar>
      )}
    </>
  );
};

export default Snackbar;
