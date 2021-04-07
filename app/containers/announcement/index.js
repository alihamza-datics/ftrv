import React, { memo, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Box from '@material-ui/core/Box';
import Swal from 'sweetalert2';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Alert } from '@material-ui/lab';
import moment from 'moment';
import { headCells } from './columns';
import WrapInCard from '../../components/layout/wrapInCard';
import DataTable from '../../components/dataTable';
import TableButtons from './tableButtons';
import { useAuthContext } from '../../context/authContext';
import { Loading } from '../../components/loading';
import { ROLES } from '../../utils/constants';
import WrapInBreadcrumbs from '../../components/layout/wrapInBreadcrumbs';
import {
  retrieveAnnouncements,
  deleteAnnouncement,
} from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { Modal, Toast, capitalize } from '../../utils/helper';

function AnnouncementContainer() {
  const [selected, setSelected] = useState([]);
  const [formatData, setFormatData] = useState([]);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(
    keys.adminAnnouncements,
    retrieveAnnouncements,
    { refetchOnWindowFocus: false }
  );
  const mutation = useMutation(deleteAnnouncement, {
    onSuccess: ({
      data: {
        data: { count },
      },
    }) => {
      setSelected([]);
      Swal.fire('Deleted!', `${count} Announcement(s) deleted.`, 'success');
      queryClient.invalidateQueries(keys.adminAnnouncements);
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

  const {
    user: {
      data: { role },
    },
  } = useAuthContext();

  const handleDelete = () => {
    if (!selected.length) {
      return;
    }
    Modal.fire().then((result) => {
      if (result.isConfirmed) {
        mutation.mutate(selected);
      }
    });
  };

  useEffect(() => {
    let updatedFormatData = [];
    if (data) {
      updatedFormatData = data.data.data.rows.map((item) => {
        const announcement = { ...item };

        announcement.startTime = moment(announcement.startTime).format(
          'MM-DD-YYYY'
        );
        announcement.endTime = moment(announcement.endTime).format(
          'MM-DD-YYYY'
        );
        announcement.status = capitalize(announcement.status);
        announcement.priority = capitalize(announcement.priority);

        return announcement;
      });
    }
    setFormatData(updatedFormatData);
  }, [data]);

  return (
    <>
      <Helmet>
        <title>Announcement</title>
      </Helmet>
      <WrapInBreadcrumbs>
        {(isLoading || mutation.isLoading) && <Loading />}
        <Box width={1}>
          <WrapInCard>
            {role === ROLES.ADMIN && (
              <Box mt={4}>
                <TableButtons
                  onDelete={handleDelete}
                  numSelected={selected.length}
                />
                {selected.length > 0 && (
                  <Box my={4}>
                    <Alert severity="info">
                      <strong>{selected.length}</strong> Announcement(s)
                      Selected
                    </Alert>
                  </Box>
                )}
              </Box>
            )}
            {!isLoading && (
              <DataTable
                data={formatData}
                headCells={headCells}
                setSelected={setSelected}
                selected={selected}
              />
            )}
          </WrapInCard>
        </Box>
      </WrapInBreadcrumbs>
    </>
  );
}

export default memo(AnnouncementContainer);
