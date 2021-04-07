import React, { memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Box from '@material-ui/core/Box';
import { debounce } from 'lodash';
import { useLocation, useHistory } from 'react-router-dom';
import { Alert } from 'components';
import Swal from 'sweetalert2';
import { deleteUser, fetchUsers } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { headCells } from './columns';
import WrapInCard from '../../components/layout/wrapInCard';
import Search from '../../components/pages/directory/search';
import Filters from '../../components/pages/directory/filters';
import DataTable from '../../components/dataTable';
import TableButtons from './tableButtons';
import { Loading } from '../../components/loading';
import { useAuthContext } from '../../context/authContext';
import { ROLES } from '../../utils/constants';
import WrapInBreadcrumbs from '../../components/layout/wrapInBreadcrumbs';
import { useStyles } from './styles';
import { Modal, Toast } from '../../utils/helper';

function DirectoryContainer() {
  const [query, setQuery] = useState({});
  const [filters, setFilters] = useState();
  const { state } = useLocation();
  const [checked, setChecked] = useState(false);
  const [toastValue, settoastValue] = useState(null);
  const [selected, setSelected] = useState([]);
  const queryClient = useQueryClient();
  const history = useHistory();
  const classes = useStyles();
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

  useEffect(() => {
    if (checked) {
      setQuery('');
    }
  }, [checked]);
  const { data, isLoading } = useQuery(
    keys.getUsers({ query, filters }),
    fetchUsers,
    { refetchOnWindowFocus: false }
  );

  const handleSwitchChange = ({ target }) => {
    setChecked(target.checked);
  };

  const handleSearch = debounce(({ target: { value } }) => {
    setQuery({ searchString: value });
  }, 500);

  const handleFilterSearch = (values) => {
    setFilters(values);
  };

  useEffect(() => {
    const temp = { ...state };
    settoastValue(temp);
    history.replace({}, '');
  }, []);
  useEffect(() => {
    if (toastValue && toastValue.toastType) {
      Toast({
        icon: toastValue.toastType,
        title: toastValue.message || 'Some error occured',
      });
    }
  }, [toastValue]);

  if (mutation.isError) {
    Swal.fire(
      '',
      'Some error occured in deleting the user. Please  try again',
      'error'
    );
  }

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
  return (
    <>
      <Helmet>
        <title>Directory Listing</title>
      </Helmet>
      <WrapInBreadcrumbs>
        {(isLoading || mutation.isLoading) && <Loading />}
        <Box width={1}>
          <WrapInCard mb={8}>
            <Box display="flex">
              <Search
                onHandleSwitchChange={handleSwitchChange}
                checked={checked}
                onHandleSearch={handleSearch}
                query={query}
              />
            </Box>
            <Box mt={8}>
              {checked && <Filters onHandleFilterSearch={handleFilterSearch} />}
            </Box>
          </WrapInCard>
          <WrapInCard>
            {role === ROLES.ADMIN && (
              <Box mt={4}>
                <TableButtons
                  onDelete={handleDelete}
                  numSelected={selected.length}
                />
              </Box>
            )}
            {selected.length > 0 && (
              <Box my={4}>
                <Alert severity="info" className={classes.alertPadding}>
                  <strong>{selected.length}</strong> User(s) Selected
                </Alert>
              </Box>
            )}

            {!isLoading && (
              <DataTable
                data={data && data.data.data.rows}
                headCells={headCells}
                setSelected={setSelected}
                selected={selected}
                matchUserIdWithIDS
              />
            )}
          </WrapInCard>
        </Box>
      </WrapInBreadcrumbs>
    </>
  );
}

export default memo(DirectoryContainer);
