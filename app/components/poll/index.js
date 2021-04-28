import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import { BodyTextLarge, H5 } from '../typography';
import BorderLinearProgress from '../muiLinearProgress';

const useStyles = () =>
  makeStyles(() => ({
    paper: {
      padding: '30px',
      borderRadius: '5px',
    },
  }));
export const Poll = ({
  options,
  name,
  description,
  handleChange,
  radioValue,
}) => {
  const theme = useTheme();
  const colorArray = ['success', 'error', 'warning', 'info'];
  const classes = useStyles()();

  const [hidden, setHidden] = useState(false);

  return (
    <>
      <Paper elevation={1} className={classes?.paper}>
        <Box p={10}>
          <Box mb={7}>
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
            {options?.map((val) => (
              <FormControlLabel
                value={val.label}
                control={<Radio />}
                label={val.label}
              />
            ))}
          </RadioGroup>

          <Box display="flex" flexDirection={['column', 'row', 'row']}>
            <Box mr={4} my={3}>
              <Button variant="contained" color="secondary">
                Vote
              </Button>
            </Box>
            <Box my={3}>
              <Button variant="contained" onClick={() => setHidden(!hidden)}>
                {hidden ? 'Show Results' : 'Hide Results'}
              </Button>
            </Box>
          </Box>

          {!hidden && (
            <>
              {options?.map((val, index) => (
                <Box mt={3}>
                  {val.label}
                  <BorderLinearProgress
                    variant="determinate"
                    value={val.result}
                    color={theme.palette[colorArray[index]]}
                  />
                </Box>
              ))}
            </>
          )}
        </Box>
      </Paper>
    </>
  );
};

Poll.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,

  handleChange: PropTypes.func.isRequired,
  radioValue: PropTypes.string.isRequired,
};
