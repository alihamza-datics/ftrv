/**
 *
 * Poll
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { PollsPage } from '../../components/pages/polls/index';

function Poll() {
  const data = [
    {
      id: 1,
      name: 'Elections',
      description:
        'Will be fare elections Will be fare electionsWill be fare electionsWill be fare electionsWill be fare electionsWill be fare elections',
      options: [
        {
          label: 'Ali',
          result: '50',
          color: 'success',
        },
        {
          label: 'Hamza',
          result: '70',
          color: 'error',
        },
        {
          label: 'zulifiqar',
          result: '30',
          color: 'warning',
        },
        {
          label: 'Wasim',
          color: 'info',
          result: '100',
        },
      ],
    },
  ];
  return (
    <>
      <Helmet>
        <title>Poll</title>
        <meta name="description" content="Description of Poll" />
      </Helmet>

      <PollsPage data={data} />
    </>
  );
}

export default memo(Poll);
