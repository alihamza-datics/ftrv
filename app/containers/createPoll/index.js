/**
 *
 * CreatePoll
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory, useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { Toast } from '../../utils/helper';

import CreatePollPage from '../../components/pages/createPoll/index';
import {
  createPoll,
  updatePoll,
  getPollById,
} from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { Loading } from '../../components/loading';

function CreatePoll() {
  const { id } = useParams();
  const history = useHistory();
  const { data, isLoading } = useQuery(
    keys.getPoll(id),
    () => getPollById(id),
    {
      enabled: !!id,
    }
  );

  const handleSubmit = (values) => {
    const val = {
      title: values.name,
      id: data?.data.id,
      body: values.question,
    };
    mutation.mutate(val);
  };
  const initialValues = {
    options: ['', ''],
    name: data?.data?.title,
    question: '',
    'options-1': 'hamza',
    'options-0': 'ali',
    startDate: new Date(),
    endDate: new Date(),
  };
  const mutation = useMutation(id ? updatePoll : createPoll, {
    onSuccess: () => {
      history.push('/polls');
      Toast({
        icon: 'success',
        title: `Poll ${id ? 'Updated' : 'Created'}  Successfully`,
      });
    },
    onError: ({
      response: {
        data: { message },
      },
    }) => {
      Toast({
        icon: 'error',
        title: message || 'Some error occured',
      });
    },
  });
  return (
    <>
      <Helmet>
        <title>{id ? 'Edit' : 'Create'} Poll</title>
        <meta name="description" content="Description of CreatePoll" />
      </Helmet>
      {isLoading ? (
        <Loading />
      ) : (
        <CreatePollPage
          onHandleSubmit={handleSubmit}
          id={id}
          initialValues={initialValues}
          pageTitle={id ? 'Update' : 'Create New'}
        />
      )}
    </>
  );
}

export default memo(CreatePoll);
