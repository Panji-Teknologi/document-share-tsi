import { ForwardedRef, ReactNode, forwardRef } from 'react';

// material-ui
import { Collapse, Fade, Box, Grow, Slide, Zoom, SxProps } from '@mui/material';

// types
import { DirectionType, PositionType, TransitionType } from '@/utils/types';

// ==============================|| TRANSITIONS ||============================== //

interface TransitionsProps {
  children?: ReactNode;
  position?: PositionType;
  type?: TransitionType;
  direction?: DirectionType;
  sx?: SxProps;
  incoming?: boolean;
}

const Transitions = forwardRef(({ children, position = 'top-left', sx, type = 'grow', direction = 'up', ...others }: TransitionsProps, ref?: ForwardedRef<unknown>) => {
  let positionSX = {
    transformOrigin: '0 0 0'
  };

  switch (position) {
    case 'top-right':
      positionSX = {
        transformOrigin: 'top right'
      };
      break;
    case 'top':
      positionSX = {
        transformOrigin: 'top'
      };
      break;
    case 'bottom-left':
      positionSX = {
        transformOrigin: 'bottom left'
      };
      break;
    case 'bottom-right':
      positionSX = {
        transformOrigin: 'bottom right'
      };
      break;
    case 'bottom':
      positionSX = {
        transformOrigin: 'bottom'
      };
      break;
    case 'top-left':
    default:
      positionSX = {
        transformOrigin: '0 0 0'
      };
      break;
  }

  return (
    <Box ref={ref} sx={sx}>
      {type === 'grow' && (
        <Grow
          {...others}
          timeout={{
            appear: 0,
            enter: 150,
            exit: 150
          }}
        >
          <Box sx={positionSX}>{children}</Box>
        </Grow>
      )}

      {type === 'collapse' && (
        <Collapse {...others} sx={positionSX}>
          {children}
        </Collapse>
      )}

      {type === 'fade' && (
        <Fade
          {...others}
          timeout={{
            appear: 0,
            enter: 300,
            exit: 150
          }}
        >
          <Box sx={positionSX}>{children}</Box>
        </Fade>
      )}

      {type === 'slide' && (
        <Slide
          {...others}
          timeout={{
            appear: 0,
            enter: 150,
            exit: 150
          }}
          direction={direction}
        >
          <Box sx={positionSX}>{children}</Box>
        </Slide>
      )}

      {type === 'zoom' && (
        <Zoom {...others}>
          <Box sx={positionSX}>{children}</Box>
        </Zoom>
      )}
    </Box>
  );
});

Transitions.displayName = 'Transitions';

export default Transitions;

export const PopupTransition = forwardRef(function Transition(props: any, ref: ForwardedRef<unknown>) {
  return <Zoom ref={ref} timeout={200} {...props} />;
});
