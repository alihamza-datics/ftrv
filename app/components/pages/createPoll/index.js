import React from 'react';
import { Formik, Form, FieldArray } from 'formik';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { string, object, date, ref } from 'yup';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';
import PersonIcon from '@material-ui/icons/Person';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import SaveIcon from '@material-ui/icons/Save';
import CustomDatePicker from './datePicker';
import { Input } from '../../index';
import WrapInBreadcrumbs from '../../layout/wrapInBreadcrumbs/index';
import WrapInCard from '../../layout/wrapInCard';
import { H5 } from '../../typography';
import { Toast } from '../../../utils/helper';

const CreatePollPage = () => {
  const upperLimitForOptions = 4;
  return (
    <WrapInBreadcrumbs>
      <WrapInCard>
        <Formik
          initialValues={{
            options: [''],
            Name: '',
            Question: '',
            startDate: new Date(),
            endDate: new Date(),
          }}
          onSubmit={() => {
            Toast({
              icon: 'success',
              title: `Poll created successfully`,
            });
          }}
          validationSchema={object().shape({
            Name: string().required('*Required'),
            Question: string(),

            startDate: date()
              .required('*Start Date Required')
              .min(new Date().toLocaleString()),
            endDate: date()
              .required('*End Date Required')
              .min(
                ref('startDate'),
                'End date should be greater than start date'
              ),
          })}
          render={({ values }) => (
            <Form>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Box pt={15} px={2} width={[1, 1 / 2]}>
                  <Box display="flex" justifyContent={['center']}>
                    <Typography>
                      <H5>Create New Poll</H5>
                    </Typography>
                  </Box>

                  <Box
                    display="flex"
                    justifyContent="space-between"
                    flexDirection={['column', 'row']}
                  >
                    <Box width={[1, 1 / 2]} mt={10} px={3}>
                      <Input
                        OutlinedInputPlaceholder="*Name"
                        name="Name"
                        variant="outlined"
                        Icon={PersonIcon}
                        appendIcon
                      />
                    </Box>
                    <Box flex="1" mt={10} px={3}>
                      <CustomDatePicker name="startDate" label="Start Date*" />
                    </Box>
                  </Box>

                  <Box
                    display="flex"
                    justifyContent="space-between"
                    flexDirection={['column', 'row']}
                  >
                    <Box flex="1" mt={10} px={3}>
                      <CustomDatePicker label="End Date*" name="endDate" />
                    </Box>
                    <Box width={[1, 1 / 2]} mt={10} px={3}>
                      <Input
                        id="standard-basic"
                        OutlinedInputPlaceholder="Questions"
                        name="Question"
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
                              display="flex"
                            >
                              <Box flex="1">
                                <Input
                                  OutlinedInputPlaceholder={`Option ${
                                    index + 1
                                  }`}
                                  name={`options-${index}`}
                                  variant="outlined"
                                  Icon={ClearIcon}
                                  onIconClick={() => arrayHelpers.remove(index)}
                                  appendIcon
                                />
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
                              Add Options
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
                              Create
                            </Button>
                          </Box>
                          <Box
                            ml={2}
                            my={[2, 0]}
                            display="flex"
                            justifyContent={['center', 'center', 'left']}
                          >
                            <Button startIcon={<ClearIcon />}>Cancel</Button>
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
