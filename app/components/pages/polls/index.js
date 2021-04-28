import React from 'react';
import { Box, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router';
import WrapInBreadcrumbs from '../../layout/wrapInBreadcrumbs/index';
import WrapInCard from '../../layout/wrapInCard';
import { H5 } from '../../typography';
import { Poll } from '../../poll';
import { Modal } from '../../../utils/helper';

export function PollsPage({ data }) {
  const history = useHistory();

  const handleDeleteEvent = () => {
    Modal.fire();
  };
  return (
    <WrapInBreadcrumbs>
      <WrapInCard mb={8}>
        <Box p={2} m={2} mt={5} mb={4}>
          <H5> Polls </H5>
        </Box>
        <Box
          display="flex"
          flexDirection={['column', 'column', 'column', 'row']}
        >
          {data?.map((val) => (
            <Box marginRight="30px">
              <Box display="flex" justifyContent="flex-end">
                <IconButton
                  onClick={() => history.push(`/polls/edit/${val.id}`)}
                >
                  <EditIcon color="secondary" />
                </IconButton>
                <IconButton onClick={handleDeleteEvent}>
                  <DeleteIcon color="error" />
                </IconButton>
              </Box>
              <Poll
                name={val.name}
                description={val.description}
                options={val.options}
              />
            </Box>
          ))}
        </Box>
      </WrapInCard>
    </WrapInBreadcrumbs>
  );
}
