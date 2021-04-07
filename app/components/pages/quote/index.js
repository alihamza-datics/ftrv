import { Box, Button } from '@material-ui/core';
import { TextArea } from 'components';
import { Form, Formik } from 'formik';
import React, { memo } from 'react';
import { H5 } from '../../typography';

function Quote({ value, handleSubmit }) {
  const initialValues = {
    quote: value,
  };

  return (
    <>
      <H5>Quote</H5>

      <Formik
        initialValues={initialValues}
        onSubmit={(values) => handleSubmit(values)}
      >
        <Form>
          <Box mt={4} width={1 / 2}>
            <TextArea name="quote" variant="outlined" />
          </Box>
          <Box mt={4} width={1 / 2} display="flex" justifyContent="flex-end">
            <Button color="secondary" variant="contained" type="submit">
              Publish
            </Button>
          </Box>
        </Form>
      </Formik>
    </>
  );
}

export default memo(Quote);
