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
  const data = [
    {
      name: 'Elections',
      description:
        'Will be fare elections Will be fare electionsWill be fare electionsWill be fare electionsWill be fare electionsWill be fare elections',
      options: [
        {
          label: 'Ali',
          result: '20',
        },
        {
          label: 'Hamza',
          result: '90',
        },
        {
          label: 'zulifiqar',
          result: '50',
        },
        {
          label: 'Wasim',
          result: '60',
        },
      ],
    },
  ];
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
              height={['45vh', '50vh', '50vh', '50vh']}
              p={2}
              width={[1, 1, 1, 1 / 2]}
              mr={[0, 0, 0, 8]}
              ml={[0, 0, 0, 8]}
            >
              <EventCalendar home eventList={eventList} isLoading={isLoading} />
            </Box>
            <Box
              p={2}
              mr={[0, 0, 0, 8]}
              ml={[0, 0, 0, 8]}
              width={[1, 1, 1, 1 / 2]}
            >
              {data?.map((val) => (
                <Poll
                  name={val.name}
                  description={val.description}
                  options={val.options}
                />
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
