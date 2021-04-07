import React from 'react';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import Swal from 'sweetalert2';
import { useAuthContext } from '../../context/authContext';
import { ROLES } from '../../utils/constants';
import { Modal } from '../../utils/helper';
import { deleteLink } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';

const ActionButtons = ({ data, setSelected, disabled }) => {
  const history = useHistory();
  const queryClient = useQueryClient();
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
  });
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();

  const handleDeleteLinks = () => {
    Modal.fire().then((result) => {
      if (result.isConfirmed) {
        mutation.mutate([data.id]);
      }
    });
  };

  return (
    <>
      {role === ROLES.ADMIN && (
        <>
          <IconButton
            onClick={() => history.push(`/useful-links/edit/${data.id}`)}
            disabled={disabled}
          >
            <EditIcon color="secondary" />
          </IconButton>
          <IconButton onClick={() => handleDeleteLinks()} disabled={disabled}>
            <DeleteIcon color="error" />
          </IconButton>
        </>
      )}
    </>
  );
};

export const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
    type: 'label',
  },
  {
    id: 'url',
    numeric: false,
    disablePadding: false,
    label: 'Links',
    type: 'link',
  },
  {
    id: 'actions',
    numeric: true,
    disablePadding: false,
    label: '',
    buttons: ActionButtons,
    type: 'action',
  },
];
