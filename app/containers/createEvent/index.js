import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation, useQueryClient } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { CreateEventPage } from '../../components/pages/createEvent';
import { createEvent, deleteEvents } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { Modal, Toast } from '../../utils/helper';

function CreateEvent() {
  const history = useHistory();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { mutate } = useMutation(createEvent, {
    onSuccess: () => {
      Toast({
        icon: 'success',
        title: `Event ${id ? 'Updated' : 'Created'}  Successfully`,
      });
      history.push('/events');
    },
    onError: ({
      response: {
        data: { message },
      },
    }) =>
      Toast({
        icon: 'error',
        title: message || 'Some error occurred',
      }),
  });
  const mutation = useMutation(deleteEvents, {
    onSuccess: ({
      data: {
        data: { count },
      },
    }) => {
      Swal.fire('Deleted!', `${count} event deleted.`, 'success');
      queryClient.invalidateQueries(keys.events);
      history.push('/events');
    },
    onError: ({
      response: {
        data: { message },
      },
    }) =>
      Toast({
        icon: 'error',
        title: message || 'Some error occurred',
      }),
  });
  const handleSubmit = (values) => {
    mutate(values);
  };
  const handleDeleteEvent = () => {
    Modal.fire().then(({ isConfirmed }) => {
      if (isConfirmed) {
        mutation.mutate([id]);
      }
    });
  };
  const initialValues = {
    title: '',
    startDate: new Date(),
    endDate: new Date(),
    description: '',
  };
  return (
    <>
      <Helmet>
        <title>{id ? 'Edit' : 'Create'} Event</title>
      </Helmet>
      <CreateEventPage
        onHandleSubmit={handleSubmit}
        id={id}
        initialValues={id ? initialValues : initialValues}
        pageTitle={id ? 'Update' : 'Create New'}
        onHandleDeleteEvent={handleDeleteEvent}
      />
    </>
  );
}

export default memo(CreateEvent);
