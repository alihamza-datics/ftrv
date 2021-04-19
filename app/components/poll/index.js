import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { Box, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router';
import { BodyTextLarge, H5 } from '../typography';
import { LinearProgress } from '../index';
import { Modal } from '../../utils/helper';

const ErrorProgressBar = withStyles((theme) => ({
  bar: {
    backgroundColor: theme.palette.error.light,
  },
}))(LinearProgress);
const WarningProgressBar = withStyles((theme) => ({
  bar: {
    backgroundColor: theme.palette.warning.light,
  },
}))(LinearProgress);
const InfoProgressBar = withStyles((theme) => ({
  bar: {
    backgroundColor: theme.palette.info.light,
  },
}))(LinearProgress);
const SuccessProgressBar = withStyles((theme) => ({
  bar: {
    backgroundColor: theme.palette.success.light,
  },
}))(LinearProgress);

const useStyles = makeStyles(() => ({
  spacing: 1,
  paper: {
    padding: '30px',
    borderRadius: '5px',
    marginRight: '30px',
  },
}));

export const Poll = ({
  id,
  name,
  description,
  firstOption,
  secondOption,
  thirdOption,
  fourthOption,
  firstOptionVotes,
  secondOptionVotes,
  thirdOptionVotes,
  fourthOptionVotes,
  handleChange,
  radioValue,
}) => {
  const [hidden, setHidden] = useState(false);
  const classes = useStyles();
  const history = useHistory();

  const navigateTo = (url) => {
    history.push(url);
  };
  const handleDeleteEvent = () => {
    Modal.fire();
  };
  return (
    <>
      <Box>
        <Box mr={10} mb={2} my={3} display="flex" justifyContent="flex-end">
          <IconButton>
            <EditIcon
              color="secondary"
              onClick={() => navigateTo(`/polls/edit/${id}`)}
            />
          </IconButton>
          <IconButton>
            <DeleteIcon color="error" onClick={handleDeleteEvent} />
          </IconButton>
        </Box>
        <Paper elevation={1} className={classes.paper}>
          <Box my={7}>
            <H5>{name}</H5>
          </Box>
          <Box>
            <BodyTextLarge bold> {description}</BodyTextLarge>
          </Box>

          <RadioGroup
            aria-label="poll"
            name="poll"
            value={radioValue}
            onChange={handleChange}
          >
            <FormControlLabel
              value={firstOption}
              control={<Radio />}
              label={firstOption}
            />
            <FormControlLabel
              value={secondOption}
              control={<Radio />}
              label={secondOption}
            />
            <FormControlLabel
              value={thirdOption}
              control={<Radio />}
              label={thirdOption}
            />
            <FormControlLabel
              value={fourthOption}
              control={<Radio />}
              label={fourthOption}
            />
          </RadioGroup>

          <Box display="flex" flexDirection={['column', 'row', 'row']}>
            <Box mr={4} my={3}>
              <Button variant="contained" color="secondary">
                Vote
              </Button>
            </Box>
            <Box my={3}>
              {hidden ? (
                <Button variant="contained" onClick={() => setHidden(false)}>
                  Show Results
                </Button>
              ) : (
                <Button variant="contained" onClick={() => setHidden(true)}>
                  Hide Results
                </Button>
              )}
            </Box>
          </Box>

          {hidden ? null : (
            <>
              <Box my={3}>
                {firstOption}
                <SuccessProgressBar
                  variant="determinate"
                  value={firstOptionVotes}
                />
              </Box>
              <Box my={3}>
                {secondOption}
                <ErrorProgressBar
                  variant="determinate"
                  value={secondOptionVotes}
                />
              </Box>
              <Box my={3}>
                {thirdOption}
                <WarningProgressBar
                  variant="determinate"
                  value={thirdOptionVotes}
                />
              </Box>
              <Box my={3}>
                {fourthOption}
                <InfoProgressBar
                  variant="determinate"
                  value={fourthOptionVotes}
                />
              </Box>
            </>
          )}
        </Paper>
      </Box>
    </>
  );
};

Poll.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  firstOption: PropTypes.string.isRequired,
  secondOption: PropTypes.string.isRequired,
  thirdOption: PropTypes.string.isRequired,
  fourthOption: PropTypes.string.isRequired,

  firstOptionVotes: PropTypes.number.isRequired,
  secondOptionVotes: PropTypes.number.isRequired,
  thirdOptionVotes: PropTypes.number.isRequired,
  fourthOptionVotes: PropTypes.number.isRequired,

  handleChange: PropTypes.func.isRequired,
  radioValue: PropTypes.string.isRequired,
};
