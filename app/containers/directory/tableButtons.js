import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

export function TableButtons({ onDelete, numSelected }) {
  const history = useHistory();
  const navigateTo = (url) => {
    history.push(url);
  };
  return (
    <Box display="flex" justifyContent="space-between" my={5}>
      <Box display="flex">
        <Box mr={2}>
          <Button
            color="secondary"
            variant="contained"
            fullWidth={false}
            startIcon={<AddIcon />}
            onClick={() => navigateTo('/directory/add')}
          >
            New
          </Button>
        </Box>
        <Box mr={2}>
          <Button
            color="secondary"
            variant="contained"
            fullWidth={false}
            startIcon={<CloudDownloadIcon />}
            onClick={() => navigateTo('/directory/upload')}
          >
            Import
          </Button>
        </Box>
        <Box mr={2}>
          <Button
            color="secondary"
            variant="contained"
            fullWidth={false}
            startIcon={<DeleteIcon />}
            onClick={onDelete}
            disabled={numSelected <= 0}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default memo(TableButtons);
