import React from 'react';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { deleteUser } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { useAuthContext } from '../../context/authContext';
import { ROLES } from '../../utils/constants';
import { Modal } from '../../utils/helper';

const ActionButtons = ({ data, disabled, setSelected }) => {
  const history = useHistory();
  const queryClient = useQueryClient();
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();

  const mutation = useMutation(deleteUser, {
    onSuccess: ({
      data: {
        data: { count },
      },
    }) => {
      setSelected([]);
      Swal.fire('Deleted!', `${count} user deleted.`, 'success');
      queryClient.invalidateQueries(keys.getUsers({}));
    },
  });

  if (mutation.isError) {
    Swal.fire(
      '',
      'Some error occured in deleting the user. Please  try again',
      'error'
    );
  }
  const handleDeleteUser = () => {
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
            disabled={disabled}
            onClick={() => history.push(`directory/edit/${data.id}`)}
          >
            <EditIcon color="secondary" />
          </IconButton>
          <IconButton onClick={() => handleDeleteUser()} disabled={disabled}>
            <DeleteIcon color="error" />
          </IconButton>
        </>
      )}
    </>
  );
};

export const headCells = [
  {
    id: 'fullName',
    numeric: false,
    disablePadding: true,
    label: 'Name',
    type: 'label',
  },
  {
    id: 'department',
    numeric: false,
    disablePadding: false,
    label: 'Department',
    type: 'label',
  },
  {
    id: 'title',
    numeric: false,
    disablePadding: false,
    label: 'Designation',
    type: 'label',
  },
  {
    id: 'location',
    numeric: false,
    disablePadding: false,
    label: 'Location',
    type: 'label',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Email ID',
    type: 'label',
  },
  {
    id: 'extension',
    numeric: true,
    disablePadding: false,
    label: 'Ext',
    type: 'label',
  },
  {
    id: 'contactNo',
    numeric: true,
    disablePadding: false,
    label: 'Cell Phone',
    type: 'label',
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
