/* eslint-disable no-unused-expressions */
import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
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
      return (
        <CustomRoute
          path={prop.path}
          component={prop.component}
          exact
          key={key}
        />
      );
    })}
  </Switch>
);

export default function Core() {
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <TopBar />
      <div className={classes.mainPanel}>
        <NavBar />
        <div className={classes.content}>
          <div className={classes.container}>{SwitchRoute}</div>
        </div>
      </div>
    </div>
  );
}
