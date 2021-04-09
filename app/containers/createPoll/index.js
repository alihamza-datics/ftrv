/**
 *
 * CreatePoll
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import CreatePollPage from '../../components/pages/createPoll/index';

function CreatePoll() {
  return (
    <>
      <Helmet>
        <title>CreatePoll</title>
        <meta name="description" content="Description of CreatePoll" />
      </Helmet>
      <CreatePollPage />
    </>
  );
}

export default memo(CreatePoll);
