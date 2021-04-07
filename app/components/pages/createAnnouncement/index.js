import {
  Box,
  Button,
  Hidden,
  FormLabel,
  FormHelperText,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import TitleOutlinedIcon from '@material-ui/icons/TitleOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import { Field, Form, Formik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { string, object, date, ref } from 'yup';
import { ANNOUNCEMENT_STATUS, ROLES } from '../../../utils/constants';
import FormikRadioGroup from '../../muiRadioButtons';
import { BodyTextLarge, H4 } from '../../typography';
import Select from '../../muiSelect';
import { useAuthContext } from '../../../context/authContext';
import { Input } from '../../index';
import { parseDate } from '../../../utils/functions';

const useStyles = makeStyles((theme) => ({
  label: {
    color: theme.palette.text.info,
  },
  dateColor: {
    color: theme.palette.text.dark,
  },
}));
const announcementSchema = object().shape({
  title: string().required('*Title Required'),
  startTime: date().required('*Start Date Required'),
  endTime: date()
    .min(ref('startTime'), 'End date should be greater than start date')
    .required('*End Date Required'),
  description: string().required('*Description Required'),
  priority: string().required('*Priority Required'),
});
function CreateAnnouncement({
  initialValues,
  onUpdateAnnouncement,
  formType = 'add',
}) {
  const options = [
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
  ];
  const classes = useStyles();
  const statusOptions = Object.keys(ANNOUNCEMENT_STATUS).map(
    (val) => ANNOUNCEMENT_STATUS[val]
  );
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();
  const history = useHistory();
  const formHeadings = {
    add: 'Create New Announcement',
    edit: 'Update Announcement Data',
  };
  const navigateTo = () => {
    history.push('/announcement');
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          try {
            const data = values;
            data.startTime = parseDate(data.startTime);
            data.endTime = parseDate(data.endTime);
            await onUpdateAnnouncement(data);
          } catch (err) {
            // ...
          }
        }}
        validationSchema={announcementSchema}
      >
        {({ setFieldValue, values, errors, touched, handleBlur }) => (
          <Form>
            <Box
              flexWrap="wrap"
              flexDirection="row"
              p={4}
              pr={[0, 36]}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box width={[1, '70%']}>
                <Box width={1} pt={10} flexWrap="wrap" display="flex" px={2}>
                  <Box width={1} textAlign="center">
                    <H4>{formHeadings[formType]}</H4>
                  </Box>
                  <Box width={[1, 1 / 2]} mt={10} px={3}>
                    <Input
                      name="title"
                      variant="outlined"
                      OutlinedInputPlaceholder="*Title"
                      Icon={TitleOutlinedIcon}
                      appendIcon
                    />
                  </Box>
                  <Box width={[1, 1 / 2]} mt={10} px={3}>
                    <Input
                      name="description"
                      variant="outlined"
                      OutlinedInputPlaceholder="*Description"
                      Icon={DescriptionOutlinedIcon}
                      appendIcon
                    />
                  </Box>

                  <Box width={[1, 1 / 2]} mt={10} px={3}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        id="startTime"
                        name="startTime"
                        label={
                          <BodyTextLarge className={classes.label}>
                            Start Date*
                          </BodyTextLarge>
                        }
                        disablePast
                        inputVariant="outlined"
                        format="MM-dd-yyyy"
                        fullWidth
                        showTodayButton
                        value={values.startTime}
                        InputProps={{ className: classes.dateColor }}
                        onBlur={handleBlur}
                        onChange={(value) => {
                          setFieldValue('startTime', value);
                        }}
                        disabled={role === ROLES.USER}
                        KeyboardButtonProps={{ tabIndex: -1 }}
                      />
                    </MuiPickersUtilsProvider>
                    {errors.startTime && touched.startTime && (
                      <FormHelperText error>{errors.startTime}</FormHelperText>
                    )}
                  </Box>
                  <Box width={[1, 1 / 2]} mt={10} px={3}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        id="endTime"
                        name="endTime"
                        label={
                          <BodyTextLarge className={classes.label}>
                            End Date*
                          </BodyTextLarge>
                        }
                        disablePast
                        inputVariant="outlined"
                        format="MM-dd-yyyy"
                        fullWidth
                        showTodayButton
                        value={values.endTime}
                        onBlur={handleBlur}
                        InputProps={{ className: classes.dateColor }}
                        onChange={(value) => {
                          setFieldValue('endTime', value);
                        }}
                        disabled={role === ROLES.USER}
                        KeyboardButtonProps={{ tabIndex: -1 }}
                      />
                    </MuiPickersUtilsProvider>
                    {errors.endTime && touched.endTime && (
                      <FormHelperText error>{errors.endTime}</FormHelperText>
                    )}
                  </Box>

                  <Box width={[1, 1 / 2]} mt={10} px={3}>
                    <Select
                      name="status"
                      selectId="status"
                      labelId="status"
                      selectName="status"
                      formControlProps={{ variant: 'outlined' }}
                      label="Set Announcement State"
                      selectedValue={values.status}
                      options={statusOptions}
                    />
                  </Box>

                  <Box width={[1, 1 / 2]} mt={10} px={3}>
                    <FormLabel component="legend">Priority</FormLabel>
                    <Field
                      name="priority"
                      component={FormikRadioGroup}
                      options={options}
                    />
                  </Box>

                  <Hidden smDown>
                    <Box width={[1, 1 / 2]} mt={10} px={3}></Box>
                  </Hidden>
                  <Box
                    display="flex"
                    flexWrap="wrap"
                    justifyContent="center"
                    width={1}
                    mt={10}
                  >
                    <Box mb={7}>
                      <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                        startIcon={<NotificationImportantIcon />}
                      >
                        {`${formType === 'add' ? 'Create' : 'Update'}`}
                      </Button>
                    </Box>
                    <Box mx={1}>
                      <Button
                        onClick={() => navigateTo()}
                        startIcon={<ClearIcon fontSize="small" />}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
}

CreateAnnouncement.propTypes = {
  initialValues: PropTypes.object,
};
CreateAnnouncement.defaultProps = {
  initialValues: {
    title: '',
    startTime: new Date(),
    endTime: new Date(),
    description: '',
    priority: '',
  },
};

export default memo(CreateAnnouncement);
