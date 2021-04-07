import { FormHelperText, FormControl, TextField } from '@material-ui/core';
import { useField } from 'formik';
import PropTypes from 'prop-types';
import React, { memo } from 'react';

function MuiDatePickerInput({
  label,
  fullWidth,
  variant,
  formControlProps,
  ...props
}) {
  const [field, meta] = useField(props);
  return (
    <FormControl
      fullWidth={fullWidth}
      error={meta.touched && meta.error}
      {...formControlProps}
      variant={variant}
    >
      <TextField
        label={label}
        type="date"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        {...field}
        {...props}
      />

      {meta.touched && meta.error ? (
        <FormHelperText error>{meta.error}</FormHelperText>
      ) : null}
    </FormControl>
  );
}

MuiDatePickerInput.propTypes = {
  name: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
  variant: PropTypes.string,
  formControlProps: PropTypes.object,
};
MuiDatePickerInput.defaultProps = {
  fullWidth: true,
};

export default memo(MuiDatePickerInput);
