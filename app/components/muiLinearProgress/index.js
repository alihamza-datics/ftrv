import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import React from 'react';
import { Box } from '@material-ui/core';

const BorderLinearProgress = ({ value, color }) => {
  const useStyles = makeStyles({
    root: {
      height: 15,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor: '#E9E9E9',
    },
    bar: {
      borderRadius: 5,
      backgroundColor: color?.main,
    },
    progressLabel: {
      position: 'relative',
      top: '8px',
      zIndex: 1,
      textAlign: 'end',
      display: 'flex',
      '& span': {
        color: 'white',
        width: `${value - 3}%`,
      },
    },
  });

  const classes = useStyles();
  return (
    <Box lineHeight={0}>
      <Box className={classes.progressLabel}>
        <span>{`${value}%`}</span>
      </Box>
      <LinearProgress
        variant="determinate"
        value={value}
        classes={{
          root: classes.root,
          colorPrimary: classes.colorPrimary,
          bar: classes.bar,
        }}
      />
    </Box>
  );
};
export default BorderLinearProgress;
