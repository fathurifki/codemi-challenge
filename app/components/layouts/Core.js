/* eslint-disable no-unused-expressions */
import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Route, Switch, Redirect } from 'react-router-dom';
import styles from '../../assets/jss/adminStyles';
import TopBar from '../Topbar';
import NavBar from '../Navbar';
import routes from '../../routes';

// eslint-disable-next-line react/prop-types
const CustomRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => <Component {...props} />} />
);

const SwitchRoute = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === '/dashboard') {
        return (
          <CustomRoute
            path={prop.layout + prop.path}
            component={prop.component}
            exact
            key={key}
          />
        );
      }
      return null;
    })}
    <Redirect from="/dashboard" to="/dashboard/home" />
  </Switch>
);

export default function Core() {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.wrapper}>
      <TopBar onMobileNavOpen={handleDrawerOpen} />
      <div className={classes.mainPanel}>
        <NavBar open={open} onClose={handleDrawerClose} />
        <div className={classes.content}>
          <div className={classes.container}>{SwitchRoute}</div>
        </div>
      </div>
    </div>
  );
}
