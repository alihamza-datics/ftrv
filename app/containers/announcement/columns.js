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
import { deleteAnnouncement } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';

const ActionButtons = ({ data, setSelected, disabled }) => {
  const history = useHistory();
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteAnnouncement, {
    onSuccess: ({
      data: {
        data: { count },
      },
    }) => {
      setSelected([]);
      Swal.fire('Deleted!', `${count} announcement(s) deleted.`, 'success');
      queryClient.invalidateQueries(keys.adminAnnouncements);
    },
  });
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();

  const handleDeleteAnnouncements = () => {
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
          <IconButton disabled={disabled}>
            <EditIcon
              color="secondary"
              onClick={() => history.push(`announcement/edit/${data.id}`)}
            />
          </IconButton>
          <IconButton
            onClick={() => handleDeleteAnnouncements()}
            disabled={disabled}
          >
            <DeleteIcon color="error" />
          </IconButton>
        </>
      )}
    </>
  );
};

export const headCells = [
  {
    id: 'title',
    numeric: false,
    disablePadding: true,
    label: 'Title',
    type: 'label',
  },
  {
    id: 'description',
    numeric: false,
    disablePadding: false,
    label: 'Description',
    type: 'label',
  },
  {
    id: 'startTime',
    numeric: false,
    disablePadding: false,
    label: 'Start Time',
    type: 'label',
  },
  {
    id: 'endTime',
    numeric: false,
    disablePadding: false,
    label: 'End Time',
    type: 'label',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
    type: 'label',
  },
  {
    id: 'priority',
    numeric: false,
    disablePadding: false,
    label: 'Priority',
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
