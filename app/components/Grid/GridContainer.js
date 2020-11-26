/* eslint-disable react/prop-types */
import React from 'react';

// @material-ui/core components
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) =>
  createStyles({
    grid: {
      margin: '0 -15px !important',
      width: 'unset',
    },
  }),
);

const GridContainer = props => {
  const classes = useStyles();

  const { children, ...rest } = props;
  return (
    <Grid container {...rest} className={classes.grid}>
      {children}
    </Grid>
  );
};

export default GridContainer;
