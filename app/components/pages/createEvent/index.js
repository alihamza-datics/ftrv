import {
  Box,
  Button,
  FormHelperText,
  IconButton,
  Link,
} from '@material-ui/core';
import React, { memo } from 'react';
import SaveIcon from '@material-ui/icons/Save';
import { Form, Formik } from 'formik';
import { string, object, date, ref } from 'yup';
import TitleOutlinedIcon from '@material-ui/icons/TitleOutlined';
import ClearIcon from '@material-ui/icons/Clear';
import PropTypes from 'prop-types';
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import DeleteIcon from '@material-ui/icons/Delete';
import WrapInBreadcrumbs from '../../layout/wrapInBreadcrumbs';
import WrapInCard from '../../layout/wrapInCard';
import { Input, TextArea } from '../../index';
import { BodyTextLarge, H5 } from '../../typography';
import { ROLES } from '../../../utils/constants';
import { useAuthContext } from '../../../context/authContext';
import { useStyles } from './style';

const eventSchema = object().shape({
  title: string().required('*Title Required'),
  startDate: date().required('*Start Date Required'),
  endDate: date()
    .min(ref('startDate'), 'End date should be greater than start date')
    .required('*End Date Required'),
  description: string(),
});

export function CreateEventPage({
  onHandleSubmit,
  id,
  initialValues,
  pageTitle,
  onHandleDeleteEvent,
}) {
  const classes = useStyles();
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();
  return (
    <WrapInBreadcrumbs>
      <WrapInCard mb={8}>
        <Box ml={3}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width={[1, 1, 1 / 2, 1 / 3]}
          >
            <Box my={7}>
              <H5> {role === ROLES.USER ? 'View' : pageTitle} Event </H5>
            </Box>
            {id && (
              <Box mr={3}>
                <IconButton onClick={onHandleDeleteEvent}>
                  <DeleteIcon color="error" />
                </IconButton>
              </Box>
            )}
          </Box>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={eventSchema}
            onSubmit={(values) => {
              onHandleSubmit(values);
            }}
          >
            {({ setFieldValue, values, errors, handleBlur, touched }) => (
              <Form>
                <Box>
                  <Box display="flex" flexDirection="column" pb={10}>
                    <Box width={[1, 1, 1 / 2, 1 / 3]} my={5}>
                      <Input
                        variant="outlined"
                        OutlinedInputPlaceholder="Title*"
                        name="title"
                        appendIcon
                        Icon={TitleOutlinedIcon}
                        IconClickable
                        isDisabled={role === ROLES.USER}
                      />
                    </Box>
                    <Box width={[1, 1, 1 / 2, 1 / 3]} mb={5}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDateTimePicker
                          id="startDate"
                          name="startDate"
                          label={
                            <BodyTextLarge className={classes.label}>
                              Start Date*
                            </BodyTextLarge>
                          }
                          disablePast
                          inputVariant="outlined"
                          format="yyyy/MM/dd hh:mm  a"
                          fullWidth
                          showTodayButton
                          value={values.startDate}
                          InputProps={{ className: classes.dateColor }}
                          onBlur={handleBlur}
                          onChange={(value) => {
                            setFieldValue('startDate', value);
                          }}
                          disabled={role === ROLES.USER}
                          KeyboardButtonProps={{ tabIndex: -1 }}
                        />
                      </MuiPickersUtilsProvider>
                      {errors.startDate && touched.startDate && (
                        <FormHelperText error>
                          {errors.startDate}
                        </FormHelperText>
                      )}
                    </Box>
                    <Box width={[1, 1, 1 / 2, 1 / 3]} mb={5}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDateTimePicker
                          id="endDate"
                          name="endDate"
                          label={
                            <BodyTextLarge className={classes.label}>
                              End Date*
                            </BodyTextLarge>
                          }
                          disablePast
                          inputVariant="outlined"
                          format="yyyy/MM/dd hh:mm a"
                          fullWidth
                          showTodayButton
                          value={values.endDate}
                          onBlur={handleBlur}
                          InputProps={{ className: classes.dateColor }}
                          onChange={(value) => {
                            setFieldValue('endDate', value);
                          }}
                          disabled={role === ROLES.USER}
                          KeyboardButtonProps={{ tabIndex: -1 }}
                        />
                      </MuiPickersUtilsProvider>
                      {errors.endDate && touched.endDate && (
                        <FormHelperText error>{errors.endDate}</FormHelperText>
                      )}
                    </Box>
                    <Box width={[1, 1, 1 / 2, 1 / 3]} mb={5}>
                      <TextArea name="description" />
                    </Box>
                  </Box>
                  <Box display="flex">
                    {role === ROLES.ADMIN && (
                      <Box mb={5}>
                        <Button
                          type="submit"
                          color="secondary"
                          variant="contained"
                          startIcon={<SaveIcon />}
                        >
                          {id ? 'Update' : 'Create'}
                        </Button>
                      </Box>
                    )}

                    <Box ml={2}>
                      <Link href="/events" underline="none">
                        <Button variant="text" startIcon={<ClearIcon />}>
                          {role === ROLES.ADMIN ? 'Cancel' : 'Back'}
                        </Button>
                      </Link>
                    </Box>
                  </Box>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </WrapInCard>
    </WrapInBreadcrumbs>
  );
}

CreateEventPage.propTypes = {
  initialValues: PropTypes.object,
  pageTitle: PropTypes.string,
};
CreateEventPage.defaultProps = {
  initialValues: {
    title: '',
    startDate: new Date(),
    endDate: new Date(),
    description: '',
  },
};

export default memo(CreateEventPage);
