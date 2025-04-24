import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';

// Project-imports

type StateType = {
  openedItem: string
  openedComponent: string
  openedHorizontalItem: string | null
  isDashboardDrawerOpened: boolean
  isComponentDrawerOpened: boolean
}

const initialState: StateType = {
  openedItem: 'dashboard',
  openedComponent: 'buttons',
  openedHorizontalItem: null,
  isDashboardDrawerOpened: false,
  isComponentDrawerOpened: true
};

export const endpoints = {
  key: 'menu',
  master: 'master',
};


export function useGetMenuMaster() {
  const { data, isLoading } = useSWR(endpoints.key + endpoints.master, () => initialState, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue = useMemo(
    () => ({
      menuMaster: data,
      menuMasterLoading: isLoading
    }),
    [data, isLoading]
  );

  return memoizedValue;
}

export async function handlerComponentDrawer(isComponentDrawerOpened: boolean) {
  // to update local state based on key

  await mutate(
    endpoints.key + endpoints.master,
    (currentMenuMaster) => {
      return { ...currentMenuMaster, isComponentDrawerOpened };
    },
    false
  );
}

export async function handlerActiveComponent(openedComponent: string) {
  // to update local state based on key

  await mutate(
    endpoints.key + endpoints.master,
    (currentMenuMaster) => {
      return { ...currentMenuMaster, openedComponent };
    },
    false
  );
}

export async function handlerDrawerOpen(isDashboardDrawerOpened: boolean) {
  // to update local state based on key

  await mutate(
    endpoints.key + endpoints.master,
    (currentMenuMaster) => {
      return { ...currentMenuMaster, isDashboardDrawerOpened };
    },
    false
  );
}

export async function handlerHorizontalActiveItem(openedHorizontalItem: string) {
  // to update local state based on key

  await mutate(
    endpoints.key + endpoints.master,
    (currentMenuMaster) => {
      return { ...currentMenuMaster, openedHorizontalItem };
    },
    false
  );
}

export async function handlerActiveItem(openedItem: string) {
  // to update local state based on key

  await mutate(
    endpoints.key + endpoints.master,
    (currentMenuMaster) => {
      return { ...currentMenuMaster, openedItem };
    },
    false
  );
}
