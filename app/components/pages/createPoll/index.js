import React from 'react';
import { Formik, Form, FieldArray } from 'formik';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import * as Yup from 'yup';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';
import PersonIcon from '@material-ui/icons/Person';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import SaveIcon from '@material-ui/icons/Save';
import CustomDatePicker from './datePicker';
import { Input } from '../../index';
import { useStyles } from './styles';
import WrapInBreadcrumbs from '../../layout/wrapInBreadcrumbs/index';
import WrapInCard from '../../layout/wrapInCard';
import { H5 } from '../../typography';
import { Toast } from '../../../utils/helper';

const CreatePollPage = ({
  heading,
  inputLabelName,
  inputLabelQuestion,
  buttonName,
  optionButtonName,
}) => {
  const classes = useStyles();
  const upperLimitForOptions = 4;
  return (
    <WrapInBreadcrumbs>
      <WrapInCard>
        <Formik
          initialValues={{
            options: [''],
            textFieldName: '',
            textFieldQuestion: '',
            startDate: undefined,
            endDate: undefined,
          }}
          onSubmit={() => {
            Toast({
              icon: 'success',
              title: `Poll created successfully`,
            });
          }}
          validationSchema={Yup.object().shape({
            textFieldName: Yup.string().required('Required'),
            textFieldQuestion: Yup.string().required('Required'),
            startDate: Yup.date()
              .required('Required')
              .default(() => new Date()),
            endDate: Yup.date()
              .required('Required')
              .when(
                'startDate',
                (startDate, schema) =>
                  startDate &&
                  schema.min(startDate, 'Must be greater than start date')
              ),
          })}
          render={({ values }) => (
            <Form>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Box pt={15} px={2} width={[1, 1 / 2]}>
                  <Box
                    flex="1"
                    display="flex"
                    justifyContent={['center']}
                    fullWidth
                  >
                    <Typography>
                      <H5>{heading}</H5>
                    </Typography>
                  </Box>

                  <Box
                    display="flex"
                    justifyContent="space-between"
                    flexDirection={['column', 'row']}
                  >
                    <Box width={[1, 1 / 2]} mt={10} px={3}>
                      <Input
                        OutlinedInputPlaceholder={inputLabelName}
                        name="textFieldName"
                        variant="outlined"
                        Icon={PersonIcon}
                        appendIcon
                      />
                    </Box>
                    <Box flex="1" mt={10} px={3}>
                      <CustomDatePicker
                        name="startDate"
                        label="Start Date"
                        className={classes.CustomFullWidth}
                      />
                    </Box>
                  </Box>

                  <Box
                    display="flex"
                    justifyContent="space-between"
                    flexDirection={['column', 'row']}
                  >
                    <Box flex="1" mt={10} px={3}>
                      <CustomDatePicker
                        label="End Date"
                        name="endDate"
                        className={classes.CustomFullWidth}
                      />
                    </Box>
                    <Box width={[1, 1 / 2]} mt={10} px={3}>
                      <Input
                        id="standard-basic"
                        OutlinedInputPlaceholder={inputLabelQuestion}
                        name="textFieldQuestion"
                        variant="outlined"
                        Icon={HelpOutlineIcon}
                        appendIcon
                      />
                    </Box>
                  </Box>
                  <FieldArray
                    name="options"
                    render={(arrayHelpers) => (
                      <Box>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          flexWrap="wrap"
                          flexDirection={['column', 'row']}
                        >
                          {values.options.map((option, index) => (
                            <Box
                              key={option.id}
                              width={[1, 1 / 2]}
                              mt={10}
                              px={3}
                              position="relative"
                              display="flex"
                            >
                              <Box flex="1">
                                <Input
                                  OutlinedInputPlaceholder={`Option ${
                                    index + 1
                                  }`}
                                  name={`options.${index}`}
                                  variant="outlined"
                                />
                              </Box>

                              <Box
                                position="absolute"
                                top="0"
                                right="0"
                                pr={2}
                                pt={2}
                              >
                                <Button
                                  type="button"
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  X
                                </Button>
                              </Box>
                            </Box>
                          ))}
                        </Box>

                        <Box
                          width={1}
                          mt={15}
                          mb={15}
                          display="flex"
                          flexDirection={['column', 'row']}
                          justifyContent="center"
                        >
                          <Box
                            ml={2}
                            display="flex"
                            justifyContent={['center', 'left']}
                          >
                            <Button
                              startIcon={<AddIcon fontSize="small" />}
                              variant="contained"
                              disabled={
                                values.options.length >= upperLimitForOptions
                              }
                              color="secondary"
                              type="button"
                              onClick={() => arrayHelpers.push('')}
                            >
                              {optionButtonName}
                            </Button>
                          </Box>
                          <Box
                            ml={2}
                            my={[2, 0]}
                            display="flex"
                            justifyContent={['center', 'left']}
                          >
                            <Button
                              variant="contained"
                              color="secondary"
                              type="submit"
                              startIcon={<SaveIcon />}
                            >
                              {buttonName}
                            </Button>
                          </Box>
                          <Box
                            ml={2}
                            my={[2, 0]}
                            display="flex"
                            justifyContent={['center', 'center', 'left']}
                          >
                            <Button startIcon={<ClearIcon fontSize="small" />}>
                              Cancel
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    )}
                  />
                </Box>
              </Box>
            </Form>
          )}
        />
      </WrapInCard>
    </WrapInBreadcrumbs>
  );
};

export default CreatePollPage;
