import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { useField, useFormikContext } from 'formik';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import { FormHelperText } from '@material-ui/core';

const MaterialUIPickers = ({ label, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        showTodayButton
        fullWidth
        disablePast
        format="MM/dd/yyyy"
        label={label}
        inputVariant="outlined"
        KeyboardButtonProps={{ tabIndex: -1 }}
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(val) => {
          setFieldValue(field.name, val);
        }}
      />
      {meta.touched && meta.error ? (
        <FormHelperText error>{meta.error}</FormHelperText>
      ) : null}
    </MuiPickersUtilsProvider>
  );
};
export default MaterialUIPickers;
