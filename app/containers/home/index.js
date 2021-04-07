/**
 *
 * Home
 *
 */

import React, { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import { Loading } from '../../components/loading';
import Home from '../../components/pages/home/loadable';
import { useAuthContext } from '../../context/authContext';
import { fetchEvents } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';

function HomeContainer() {
  const { user } = useAuthContext();
  const history = useHistory();
  const dailyQuote =
    '"lorem ipsum dolor sit amet consectetur adipisicing elitNemo lorem ipsum dolor sit amet consectetur adipisicing elit Nemo"';
  useEffect(() => {
    if (!user || !user.isAuthenticated) {
      history.push('/');
    }
  }, []);
  const { data, isLoading } = useQuery(keys.events, fetchEvents, {
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Description of Home" />
      </Helmet>
      {isLoading && <Loading />}
      <Home
        dailyQuote={dailyQuote}
        isLoading={isLoading}
        eventList={data?.data?.data?.rows}
      />
    </>
  );
}

export default memo(HomeContainer);
