import { FC } from 'react';

export type Submenu = {
  id: string;
  title: string;
  type: 'item';
  url?: string;
  icon?: JSX.Element | FC;
  breadcrumbs?: boolean;
}

export type MainMenu = {
  id: string;
  title: string;
  caption?: string;
  type: 'item' | 'collapse';
  url?: string;
  icon: JSX.Element | FC;
  breadcrumbs?: boolean;
  isDropdown?: boolean;
  children?: Submenu[] | []
}

export type MenuType = {
  id: string;
  title: string;
  type: 'group';
  icon?: JSX.Element | FC;
  children?: MainMenu[] | [];
}

// project import
import dashboard from './dashboard';
import action from './action';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [action, dashboard]
};

export default menuItems;