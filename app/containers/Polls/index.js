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
        },
        {
          label: 'Hamza',
          result: '70',
        },
        {
          label: 'zulifiqar',
          result: '30',
        },
        {
          label: 'Wasim',
          result: '100',
        },
      ],
    },
    {
      id: 1,
      name: 'Elections',
      description:
        'Will be fare elections Will be fare electionsWill be fare electionsWill be fare electionsWill be fare electionsWill be fare elections',
      options: [
        {
          label: 'Ali',
          result: '30',
        },
        {
          label: 'Hamza',
          result: '50',
        },
        {
          label: 'zulifiqar',
          result: '70',
        },
        {
          label: 'Wasim',
          result: '100',
        },
      ],
    },
    {
      id: 1,
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
      <Helmet>
        <title>Poll</title>
        <meta name="description" content="Description of Poll" />
      </Helmet>

      <PollsPage data={data} />
    </>
  );
}

export default memo(Poll);
