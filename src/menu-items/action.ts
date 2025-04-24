// assets
import { CoPresentOutlined, SnippetFolderOutlined } from '@mui/icons-material';
import { MenuType } from '.';
// icons
const icons = {
  CoPresentOutlined,
  SnippetFolderOutlined
};

// ==============================|| MENU ITEMS - EXTRA ||============================== //

const action: MenuType = {
  id: 'action',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'drive',
      title: 'Drive',
      type: 'item',
      url: '/drive',
      icon: icons.SnippetFolderOutlined
    },
    {
      id: 'upload',
      title: 'Upload Document',
      type: 'item',
      url: '/upload',
      icon: icons.CoPresentOutlined
    },
  ]
};

export default action;
