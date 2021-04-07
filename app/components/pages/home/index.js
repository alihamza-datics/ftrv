import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { EventCalendar } from '../events/calendar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },

  bannerGridSection: {
    backgroundColor: theme.palette.bgColor.secondary,
    flex: '0.3',
    marginBlock: '0.2rem',
  },
  statsSection: {
    backgroundColor: theme.palette.bgColor.secondary,
    flex: '0.7',
    marginBlock: '0.2rem',
  },
}));
function Home({ eventList, isLoading }) {
  const classes = useStyles();

  return (
    <>
      <Grid xs={12} className={classes.root}>
        <Grid xs={12} className={classes.bannerGridSection} />
        <Grid xs={12} className={classes.statsSection}>
          <Box m={10}>
            <Box height="50vh" width={[1, 1, 1, 1 / 2]}>
              <EventCalendar home eventList={eventList} isLoading={isLoading} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
