import React, { memo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Swal from 'sweetalert2';
import { Loading } from '../../components/loading';
import UsefulLinksPage from '../../components/pages/usefulLinks';
import { deleteLink, fetchLinks } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { Modal, Toast } from '../../utils/helper';
import { headCells } from './columns';

function UsefulLinks() {
  const [selected, setSelected] = useState([]);
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(keys.links, fetchLinks, {
    refetchOnWindowFocus: false,
  });
  const mutation = useMutation(deleteLink, {
    onSuccess: ({
      data: {
        data: { count },
      },
    }) => {
      setSelected([]);
      Swal.fire('Deleted!', `${count} link(s) deleted.`, 'success');
      queryClient.invalidateQueries(keys.links);
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

  const handleDeleteLinks = () => {
    if (!selected.length) {
      return;
    }
    Modal.fire().then((result) => {
      if (result.isConfirmed) {
        mutation.mutate(selected);
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>Useful Links</title>
      </Helmet>
      {isLoading && <Loading />}
      <UsefulLinksPage
        data={data?.data?.data?.rows}
        selected={selected}
        setSelected={setSelected}
        onDelete={handleDeleteLinks}
        headCells={headCells}
        isLoading={isLoading}
      />
    </>
  );
}

export default memo(UsefulLinks);
