import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { BodyTextLarge, H5 } from '../typography';
import { LinearProgress } from '../index';

const warning = 'warning';
const main = 'main';
const useStyles = (props) =>
  makeStyles((theme) => ({
    paper: {
      padding: '30px',
      borderRadius: '5px',
    },
    barColorPrimary: {
      backgroundColor: theme.palette[warning[main]],
    },
  }));
export const Poll = ({
  options,
  name,
  description,

  handleChange,
  radioValue,
}) => {
  const colorArray = ['error', 'info', 'info', 'info'];
  colorArray.map((color) => {
    classes = useStyles(color)();
  });
  const [hidden, setHidden] = useState(false);

  return (
    <>
      <Paper elevation={1} className={classes.paper}>
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
              <Box my={3}>
                {val.label}

                <LinearProgress
                  variant="determinate"
                  value={val.result}
                  classes={{
                    // colorPrimary: classes.colorPrimary,
                    barColorPrimary: classes.barColorPrimary,
                  }}
                  // className={classes.barColorPrimary}
                  // classes={{
                  //   colorPrimary: { backgroundColor: colorArray[index] },
                  // }}
                  // style={{ backgroundColor: colorArray[index] }}
                  // variant="determinate"
                  // value={50}
                  // className={classes.barColor}
                />
              </Box>
            ))}
          </>
        )}
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
