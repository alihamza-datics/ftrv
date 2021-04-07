import React from 'react';
import Box from '@material-ui/core/Box';
import { Form, Formik } from 'formik';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import { Input } from '../../index';

function Filters({ onHandleFilterSearch }) {
  return (
    <>
      <Formik
        initialValues={{
          name: '',
          department: '',
          title: '',
          extension: '',
          location: '',
        }}
        onSubmit={(values) => {
          onHandleFilterSearch(values);
        }}
      >
        {({ resetForm }) => (
          <Form>
            <Box display="flex" justifyContent="space-between">
              <Box width={1 / 6}>
                <Input name="name" placeholderText="Name" />
              </Box>
              <Box width={1 / 6}>
                <Input name="department" placeholderText="Department" />
              </Box>
              <Box width={1 / 6}>
                <Input name="title" placeholderText="Designation" />
              </Box>
              <Box width={1 / 6}>
                <Input name="location" placeholderText="Location" />
              </Box>
              <Box width={1 / 6}>
                <Input name="extension" placeholderText="Extension" />
              </Box>
            </Box>
            <Box display="flex" my={12}>
              <Box mr={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth={false}
                  startIcon={<SearchIcon />}
                  type="submit"
                >
                  Search
                </Button>
              </Box>
              <Box mr={2}>
                <Button
                  variant="text"
                  fullWidth={false}
                  onClick={resetForm}
                  startIcon={<ClearIcon />}
                >
                  Clear Filter
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default Filters;
