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

export function PollsPage() {
  const numberOfPolls = [
    {
      id: 1,
      name: 'Elections',
      description:
        'Will be fare elections Will be fare electionsWill be fare electionsWill be fare electionsWill be fare electionsWill be fare elections',
      firstOption: 'Ali',
      firstOptionValue: 50,
      secondOption: 'Hamza',
      secondOptionValue: 70,
      thirdOption: 'Zulifaqar',
      thirdOptionValue: 40,
      fourthOption: 'Waseem',
      fourthOptionValue: 20,
    },
    {
      id: 2,
      name: 'Biding',
      description:
        'Will be Fare Biding Will be Fare BidingWill be Fare BidingWill be Fare BidingWill be Fare BidingWill be Fare BidingWill be Fare Biding',
      firstOption: 'Ali',
      firstOptionValue: 50,
      secondOption: 'Hamza',
      secondOptionValue: 70,
      thirdOption: 'Zulifaqar',
      thirdOptionValue: 90,
      fourthOption: 'Waseem',
      fourthOptionValue: 20,
    },
    {
      id: 3,
      name: 'Biding',
      description:
        'Will be Fare Biding Will be Fare BidingWill be Fare BidingWill be Fare BidingWill be Fare BidingWill be Fare BidingWill be Fare Biding',
      firstOption: 'Ali',
      firstOptionValue: 50,
      secondOption: 'Hamza',
      secondOptionValue: 70,
      thirdOption: 'Zulifaqar',
      thirdOptionValue: 20,
      fourthOption: 'Waseem',
      fourthOptionValue: 20,
    },
  ];

  const history = useHistory();

  const handleDeleteEvent = () => {
    Modal.fire();
  };
  return (
    <WrapInBreadcrumbs>
      <WrapInCard mb={8}>
        <Box my={7}>
          <H5> Polls </H5>
        </Box>

        <Box display="flex" flexDirection={['column', 'column', 'row']}>
          {numberOfPolls?.map((val) => (
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
                id={val.id}
                name={val.name}
                description={val.description}
                firstOption={val.firstOption}
                secondOption={val.secondOption}
                thirdOption={val.thirdOption}
                fourthOption={val.fourthOption}
                firstOptionVotes={val.firstOptionValue}
                secondOptionVotes={val.secondOptionValue}
                thirdOptionVotes={val.thirdOptionValue}
                fourthOptionVotes={val.fourthOptionValue}
              />
            </Box>
          ))}
        </Box>
      </WrapInCard>
    </WrapInBreadcrumbs>
  );
}
