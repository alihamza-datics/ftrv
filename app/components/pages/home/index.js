import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { EventCalendar } from '../events/calendar';
import { Poll } from '../../poll';

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
          <Box
            m={[2, 2, 2, 10]}
            display="flex"
            flexDirection={['column', 'column', 'column', 'row']}
          >
            <Box
              height="62vh"
              p={2}
              mx={[0, 0, 0, 20]}
              width={[1, 1, 1, 1 / 2]}
            >
              <EventCalendar home eventList={eventList} isLoading={isLoading} />
            </Box>
            <Box
              height="auto"
              p={2}
              mx={[0, 0, 0, 20]}
              width={[1, 1, 1, 1 / 2]}
            >
              <Poll
                name="Biding"
                description="Will be Fare Biding Will be Fare BidingWill be Fare BidingWill be Fare BidingWill be Fare BidingWill be Fare BidingWill be Fare Biding"
                firstOption="Ali"
                firstOptionValue="50"
                secondOption="Hamza"
                secondOptionValue="70"
                thirdOption="Zulifaqar"
                thirdOptionValue="20"
                fourthOption="Waseem"
                fourthOptionValue="20"
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
