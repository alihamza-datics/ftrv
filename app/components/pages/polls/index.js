import { Box } from '@material-ui/core';
import React from 'react';
import WrapInBreadcrumbs from '../../layout/wrapInBreadcrumbs/index';
import WrapInCard from '../../layout/wrapInCard';
import { H5 } from '../../typography';
import { Poll } from '../../poll';

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

  return (
    <WrapInBreadcrumbs>
      <WrapInCard mb={8}>
        <Box my={7}>
          <H5> Polls </H5>
        </Box>

        <Box display="flex" flexDirection={['column', 'column', 'row']}>
          {numberOfPolls?.map((val) => (
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
          ))}
        </Box>
      </WrapInCard>
    </WrapInBreadcrumbs>
  );
}
