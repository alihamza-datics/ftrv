/**
 *
 * CreatePoll
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory, useParams } from 'react-router-dom';
import { Toast } from '../../utils/helper';

import CreatePollPage from '../../components/pages/createPoll/index';

function CreatePoll() {
  const { id } = useParams();
  const history = useHistory();
  const handleSubmit = () => {
    Toast({
      icon: 'success',
      title: `Poll ${id ? 'Updated' : 'Created'}  Successfully`,
    });
    history.push('/polls');
  };
  const initialValues = {
    options: ['', ''],
    name: '',
    question: '',
    'options-1': '',
    'options-0': '',
    startDate: new Date(),
    endDate: new Date(),
  };

  return (
    <>
      <Helmet>
        <title>{id ? 'Edit' : 'Create'} Poll</title>
        <meta name="description" content="Description of CreatePoll" />
      </Helmet>
      <CreatePollPage
        onHandleSubmit={handleSubmit}
        id={id}
        initialValues={id ? initialValues : initialValues}
        pageTitle={id ? 'Update' : 'Create New'}
      />
    </>
  );
}

export default memo(CreatePoll);
