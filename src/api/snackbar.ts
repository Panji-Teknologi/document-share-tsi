import { useMemo } from 'react';

// material ui
import { AlertColor, SnackbarOrigin } from '@mui/material';

// third-party
import useSWR, { mutate } from 'swr';

export const endpoints = {
  key: 'snackbar'
};

type StateType = {
  action?: boolean
  open?: boolean
  message?: string
  anchorOrigin?: SnackbarOrigin
  variant?: 'default' | 'alert'
  alert: {
    color?: AlertColor
    variant?: 'filled' | 'outlined'
  }
  transition?: 'Fade' | 'Grow' | 'SlideUp' | 'SlideDown'
  close?: boolean
  actionButton?: boolean
  maxStack?: number
  dense?: boolean
  iconVariant?: string
}

const initialState: StateType = {
  action: false,
  open: false,
  message: 'Note archived',
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'right'
  },
  variant: 'default',
  alert: {
    color: 'info',
    variant: 'filled'
  },
  transition: 'Fade',
  close: false,
  actionButton: false,
  maxStack: 3,
  dense: false,
  iconVariant: 'usedefault'
};

export function useGetSnackbar() {
  const { data } = useSWR(endpoints.key, () => initialState, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue = useMemo(() => ({ snackbar: data }), [data]);

  return memoizedValue;
}

export function openSnackbar(snackbar: StateType) {
  // to update local state based on key

  const { action, open, message, anchorOrigin, variant, alert, transition, close, actionButton } = snackbar;

  mutate(
    endpoints.key,
    (currentSnackbar) => {
      return {
        ...currentSnackbar,
        action: action ?? initialState.action,
        open: open ?? initialState.open,
        message: message ?? initialState.message,
        anchorOrigin: anchorOrigin ?? initialState.anchorOrigin,
        variant: variant ?? initialState.variant,
        alert: {
          color: alert?.color ?? initialState.alert?.color,
          variant: alert?.variant ?? initialState.alert?.variant
        },
        transition: transition ?? initialState.transition,
        close: close ?? initialState.close,
        actionButton: actionButton ?? initialState.actionButton
      };
    },
    false
  );
}

export async function closeSnackbar() {
  // to update local state based on key
  await mutate(
    endpoints.key,
    (currentSnackbar) => {
      return { ...currentSnackbar, open: false };
    },
    false
  );
}

export async function handlerIncrease(maxStack: number) {
  // to update local state based on key
  await mutate(
    endpoints.key,
    (currentSnackbar) => {
      return { ...currentSnackbar, maxStack };
    },
    false
  );
}

export async function handlerDense(dense: boolean) {
  // to update local state based on key
  await mutate(
    endpoints.key,
    (currentSnackbar) => {
      return { ...currentSnackbar, dense };
    },
    false
  );
}

export async function handlerIconVariants(iconVariant: string) {
  // to update local state based on key
  await mutate(
    endpoints.key,
    (currentSnackbar) => {
      return { ...currentSnackbar, iconVariant };
    },
    false
  );
}
