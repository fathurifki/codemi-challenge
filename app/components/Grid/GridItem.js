/* eslint-disable no-unused-vars */
import React from 'react';
// @material-ui/core components
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme =>
  createStyles({
    grid: {
      margin: '0 15px !important',
      width: 'unset',
    },
  }),
);

const GridItem = props => {
  const classes = useStyles();
  const { children, ...rest } = props;
  return (
    <Grid item {...rest} className={classes.grid}>
      {children}
    </Grid>
  );
};

GridItem.propTypes = {
  children: PropTypes.any,
};

export default GridItem;
