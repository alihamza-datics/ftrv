/**
 *
 * Select
 *
 */

import React from 'react';
import {
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  FormHelperText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { useField } from 'formik';

const useStyles = makeStyles((theme) => ({
  label: {
    color: theme.palette.text.info,
  },
  select: {
    color: theme.palette.text.dark,
    textTransform: 'capitalize',
  },
  textStyle: {
    textTransform: 'capitalize',
  },
}));
export default function SelectInput({
  labelId,
  selectId,
  fullWidth,
  label,
  helperText,
  options,
  onHandleChange,
  selectedValue,
  selectName,
  formControlProps,
  ...props
}) {
  const [field, meta] = useField(props);
  const classes = useStyles();
  return (
    <>
      <FormControl
        fullWidth={fullWidth}
        variant="outlined"
        {...formControlProps}
        error={meta.error && true}
      >
        <InputLabel className={classes.label} id={selectId}>
          {label}
        </InputLabel>
        <Select
          labelId={labelId}
          id={selectId}
          onChange={onHandleChange}
          value={selectedValue}
          className={classes.select}
          name={selectName}
          error={meta.error}
          label={label}
          {...field}
          {...props}
        >
          {/* <MenuItem value="">
            <em>None</em>
          </MenuItem> */}
          {options &&
            options.map((val) =>
              val.value !== undefined ? (
                <MenuItem className={classes.textStyle} value={val.value}>
                  {val.label}
                </MenuItem>
              ) : (
                <MenuItem className={classes.textStyle} value={val}>
                  {val}
                </MenuItem>
              )
            )}
        </Select>

        <FormHelperText>{helperText}</FormHelperText>
        {meta.touched && meta.error ? (
          <FormHelperText error>{meta.error}</FormHelperText>
        ) : null}
      </FormControl>
    </>
  );
}

SelectInput.propTypes = {
  labelId: PropTypes.string,
  selectId: PropTypes.string,
  fullWidth: PropTypes.bool,
  label: PropTypes.string,
  helperText: PropTypes.string,
  options: PropTypes.array,
  onHandleChange: PropTypes.func,
  selectedValue: PropTypes.string,
  selectName: PropTypes.string,
  formControlProps: PropTypes.object,
};

SelectInput.defaultProps = {
  fullWidth: true,
};

// Usage

/* <Select
name="department"
  labelId="label-id"
  selectId="select-id"
  fullWidth={true}
  label="Department"
  helperText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam pariatur accusantium fugit voluptatem dignissimos delectus accusamus facilis ullam nisi culpa."
  options={top100Films}
  onHandleChange={handleChange}
  selectedValue={value}
  selectName="department"
  ...otherProps
/> */
