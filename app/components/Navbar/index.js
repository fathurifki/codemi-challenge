import React from 'react';
import PropTypes from 'prop-types';
import { Box, Drawer, Hidden, List, makeStyles } from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
} from 'react-feather';
import NavItem from './NavItem';

const items = [
  {
    href: '/dashboard/home',
    icon: BarChartIcon,
    title: 'Dashboard',
  },
  {
    href: '/dashboard/customers',
    icon: UsersIcon,
    title: 'Customers',
  },
  {
    href: '/dashboard/products',
    icon: ShoppingBagIcon,
    title: 'Products',
  },
  {
    href: '/dashboard/account',
    icon: UserIcon,
    title: 'Account',
  },
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)',
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64,
  },
}));

const NavBar = ({ open, onClose }) => {
  const classes = useStyles();
  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box p={2}>
        <List>
          {items.map(item => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onClose}
          open={open}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.bool,
};

export default NavBar;
