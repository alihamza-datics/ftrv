import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation, useQuery } from 'react-query';
import { useHistory, useParams } from 'react-router';
import { AddUsefulLinkPage } from '../../components/pages/addUsefulLink';
import {
  createLink,
  getLinkById,
  updateLink,
} from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { Toast } from '../../utils/helper';
import { Loading } from '../../components/loading';

function AddUsefulLink() {
  const history = useHistory();
  const { id } = useParams();
  const { data, isLoading } = useQuery(
    keys.getLink(id),
    () => getLinkById(id),
    {
      enabled: !!id,
      refetchOnWindowFocus: false,
    }
  );
  const mutation = useMutation(id ? updateLink : createLink, {
    onSuccess: () => {
      history.push('/useful-links');
      Toast({
        icon: 'success',
        title: `Link ${id ? 'updated' : 'created'}  successfully`,
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
  const handleSubmit = (values) => {
    mutation.mutate(values);
  };

  return (
    <>
      <Helmet>
        <title>Useful Links</title>
      </Helmet>
      {isLoading && <Loading />}
      <AddUsefulLinkPage
        id={id}
        onHandleSubmit={handleSubmit}
        initialValues={data?.data.data}
        history={history}
      />
    </>
  );
}

export default memo(AddUsefulLink);
