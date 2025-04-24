'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';

// next
import NextLink from 'next/link';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, SxProps, Typography } from '@mui/material';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';

// project import
import MainCard from '@/components/MainCard';
import { MainMenu, Submenu } from '@/menu-items';
import { ThemeDirection } from '@/config';

// assets
import { AccountTreeRounded, HomeOutlined, HomeRounded } from '@mui/icons-material';

// ==============================|| BREADCRUMBS ||============================== //

interface BreadcrumbsProps {
  card?: boolean;
  divider?: boolean;
  custom?: boolean;
  heading?: string;
  icon?: boolean;
  icons?: boolean;
  links?: { title?: string | undefined, to?: string | undefined, icon?: any }[];
  maxItems?: number;
  rightAlign?: boolean;
  separator?: any;
  title?: boolean;
  titleBottom?: boolean;
  sx?: SxProps;
}

const Breadcrumbs = ({
  card = false,
  custom = false,
  divider = false,
  heading,
  icon,
  icons,
  links,
  maxItems,
  rightAlign,
  separator,
  title = true,
  titleBottom = true,
  sx,
  ...others
}: BreadcrumbsProps) => {
  const theme = useTheme();
  const location = usePathname();
  const [main, setMain] = useState<MainMenu | null>(null);
  const [item, setItem] = useState<Submenu | null>(null);

  const iconSX = {
    marginRight: theme.direction === ThemeDirection.RTL ? '0' : theme.spacing(0.75),
    marginLeft: theme.direction === ThemeDirection.RTL ? theme.spacing(0.75) : '0',
    marginTop: `-${theme.spacing(0.25)}`,
    width: '1rem',
    height: '1rem',
    color: theme.palette.secondary.main
  };

  let customLocation = location;

  // set active item state
  const getCollapse = (menu: MainMenu) => {
    if (!custom && menu.children) {
      menu.children.filter((collapse: any) => {
        if (collapse.type && collapse.type === 'collapse') {
          getCollapse(collapse);
          if (collapse.url === customLocation) {
            setMain(collapse);
            setItem(collapse);
          }
        } else if (collapse.type && collapse.type === 'item') {
          if (customLocation === collapse.url) {
            setMain(menu);
            setItem(collapse);
          }
        }
        return false;
      });
    }
  };

  // item separator
  const SeparatorIcon = separator;
  const separatorIcon = separator ? <SeparatorIcon style={{ fontSize: '0.75rem', marginTop: 2 }} /> : '/';

  let mainContent;
  let itemContent;
  let breadcrumbContent = <Typography />;
  let itemTitle = '';
  let CollapseIcon;
  let ItemIcon;

  // collapse item
  if (!custom && main && main.type === 'collapse' && main.breadcrumbs === true) {
    CollapseIcon = main.icon ? main.icon : AccountTreeRounded as any;
    mainContent = (
      <Typography
        sx={{ textDecoration: 'none' }}
        color={window.location.pathname === main.url ? 'text.primary' : 'text.secondary'}
        variant={window.location.pathname === main.url ? 'subtitle1' : 'h6'}
      >
        {icons && <CollapseIcon style={iconSX} />}
        {main.title}
      </Typography>
    );
    breadcrumbContent = (
      <MainCard
        border={card}
        sx={card === false ? { mb: 3, bgcolor: 'transparent', ...sx } : { mb: 3, ...sx }}
        {...others}
        content={card}
        shadow="none"
      >
        <Grid
          container
          direction={rightAlign ? 'row' : 'column'}
          justifyContent={rightAlign ? 'space-between' : 'flex-start'}
          alignItems={rightAlign ? 'center' : 'flex-start'}
          spacing={1}
        >
          <Grid item>
            <MuiBreadcrumbs aria-label="breadcrumb" maxItems={maxItems || 8} separator={separatorIcon}>
              <NextLink href="/" passHref legacyBehavior>
                <Typography color="textSecondary" variant="h6" sx={{ textDecoration: 'none' }}>
                  {icons && <HomeOutlined style={iconSX} />}
                  {icon && !icons && <HomeRounded style={{ ...iconSX, marginRight: 0 }} />}
                  {(!icon || icons) && 'Home'}
                </Typography>
              </NextLink>
              {mainContent}
            </MuiBreadcrumbs>
          </Grid>
          {title && titleBottom && (
            <Grid item sx={{ mt: card === false ? 0.25 : 1 }}>
              <Typography variant="h2">{main.title}</Typography>
            </Grid>
          )}
        </Grid>
        {card === false && divider !== false && <Divider sx={{ mt: 2 }} />}
      </MainCard>
    );
  }

  // items
  if ((item && item.type === 'item') || custom) {
    itemTitle = item?.title as string;

    ItemIcon = item?.icon ? item.icon : AccountTreeRounded as any;
    itemContent = (
      <Typography variant="subtitle1" color="textPrimary">
        {icons && <ItemIcon style={iconSX} />}
        {itemTitle}
      </Typography>
    );

    let tempContent = (
      <MuiBreadcrumbs aria-label="breadcrumb" maxItems={maxItems || 8} separator={separatorIcon}>
        <NextLink href="/" passHref legacyBehavior>
          <Typography color="textSecondary" variant="h6" sx={{ textDecoration: 'none' }}>
            {icons && <HomeOutlined style={iconSX} />}
            {icon && !icons && <HomeOutlined style={{ ...iconSX, marginRight: 0 }} />}
            {(!icon || icons) && 'Home'}
          </Typography>
        </NextLink>
        {mainContent}
        {itemContent}
      </MuiBreadcrumbs>
    );

    if (custom && links && links?.length > 0) {
      tempContent = (
        <MuiBreadcrumbs aria-label="breadcrumb" maxItems={maxItems || 8} separator={separatorIcon}>
          {links?.map((link, index) => {
            CollapseIcon = link.icon ? link.icon : AccountTreeRounded;

            let breadcrumbLink = (
              <Typography
                key={index}
                variant={!link.to ? 'subtitle1' : 'h6'}
                sx={{ textDecoration: 'none', ...(link.to && { cursor: 'pointer' }) }}
                color={!link.to ? 'text.primary' : 'text.secondary'}
              >
                {link.icon && <CollapseIcon style={iconSX} />}
                {link.title}
              </Typography>
            );
            if (link.to) {
              breadcrumbLink = (
                <NextLink key={index} href={link.to} passHref legacyBehavior>
                  {breadcrumbLink}
                </NextLink>
              );
            }

            return breadcrumbLink
          })}
        </MuiBreadcrumbs>
      );
    }

    // main
    if (item?.breadcrumbs !== false || custom) {
      breadcrumbContent = (
        <MainCard
          border={card}
          sx={card === false ? { mb: 3, bgcolor: 'transparent', ...sx } : { mb: 3, ...sx }}
          {...others}
          content={card}
          shadow="none"
        >
          <Grid
            container
            direction={rightAlign ? 'row' : 'column'}
            justifyContent={rightAlign ? 'space-between' : 'flex-start'}
            alignItems={rightAlign ? 'center' : 'flex-start'}
            spacing={1}
          >
            {title && !titleBottom && (
              <Grid item>
                <Typography variant="h2">{custom ? heading : item?.title}</Typography>
              </Grid>
            )}
            <Grid item>{tempContent}</Grid>
            {title && titleBottom && (
              <Grid item sx={{ mt: card === false ? 0.25 : 1 }}>
                <Typography variant="h2">{custom ? heading : item?.title}</Typography>
              </Grid>
            )}
          </Grid>
          {card === false && divider !== false && <Divider sx={{ mt: 2 }} />}
        </MainCard>
      );
    }
  }

  return breadcrumbContent;
};

export default Breadcrumbs;
