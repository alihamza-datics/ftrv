import 'date-fns';
import React from 'react';
import Box from '@material-ui/core/Box';
import DateFnsUtils from '@date-io/date-fns';
import { useField, useFormikContext } from 'formik';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { useStyles } from './styles';

const MaterialUIPickers = ({ label, ...props }) => {
  const classes = useStyles();
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Box>
        <KeyboardDatePicker
          {...field}
          {...props}
          disableToolbar
          format="MM/dd/yyyy"
          id="date-picker-inline"
          label={label}
          inputVariant="outlined"
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          value={field.value}
          selected={field.value}
          onChange={(val) => {
            setFieldValue(field.name, val);
          }}
        />
        {meta.touched && meta.error ? (
          <Box className={classes.errorColor}>{meta.error}</Box>
        ) : null}
      </Box>
    </MuiPickersUtilsProvider>
  );
};
export default MaterialUIPickers;
