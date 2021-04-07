import { Avatar, Box, Button } from '@material-ui/core';
import { TextArea } from 'components';
import { makeStyles } from '@material-ui/core/styles';
import { Add } from '@material-ui/icons';
import ClearIcon from '@material-ui/icons/Clear';
import { Input } from 'components';
import { MuiFileInput } from 'components/muiFileInput';
import { Form, Formik } from 'formik';
import React, { memo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FILE_ACCEPT_TYPES } from 'utils/constants';
import WrapInCard from '../../layout/wrapInCard';
import WrapInBreadcrumbs from '../../layout/wrapInBreadcrumbs/index';
import { H4 } from '../../typography';
import { formValidaton } from './formValidation';

const useStyles = makeStyles((theme) => ({
  imageStyle: {
    width: '150px',
    height: '150px',
  },
  label: {
    color: theme.palette.text.info,
  },
  dateColor: {
    color: theme.palette.text.dark,
  },
}));

function AddCeoMessage({ initialData }) {
  const classes = useStyles();
  const [imgFile, setImgFile] = useState(
    (initialData && initialData.avatar) || null
  );
  const history = useHistory();

  return (
    <WrapInBreadcrumbs>
      <WrapInCard mb={8}>
        <Formik
          initialValues={initialData}
          validationSchema={formValidaton}
          onSubmit={async () => {}}
        >
          {({ setFieldValue }) => (
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
                <Box
                  width={[1, 1, 1, '30%']}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box width={1} display="flex" justifyContent="center">
                    <Box
                      width={[1 / 2, 1]}
                      display="flex"
                      justifyContent="center"
                    >
                      <Avatar src={imgFile} className={classes.imageStyle} />
                    </Box>
                  </Box>
                  <Box
                    ml={1}
                    pt={5}
                    display="flex"
                    justifyContent="center"
                    style={{
                      minWidth: '118px',
                    }}
                  >
                    <Input
                      name="file"
                      inputID="file"
                      inputType="file"
                      disableUnderline
                      inputComponent={(props) => (
                        <MuiFileInput
                          name="file"
                          mutation=""
                          setImgFile={setImgFile}
                          setFieldValue={setFieldValue}
                          acceptTypes={FILE_ACCEPT_TYPES.imageFiles}
                          toolTipTitle="Select profile image"
                          buttonText="Upload Image"
                          BtnIcon={Add}
                          {...props}
                        />
                      )}
                    />
                  </Box>
                </Box>
                <Box width={[1, 1, 1, '70%']}>
                  <Box width={1} pt={10} flexWrap="wrap" display="flex" px={2}>
                    <Box width={1} textAlign="center">
                      <H4>Update Ceo Message</H4>
                    </Box>

                    <Box width={1} mt={10} px={3} mb={8}>
                      <TextArea
                        name="message"
                        variant="outlined"
                        OutlinedInputPlaceholder="ceo message"
                        multiline
                        rows={20}
                        rowsMax={17}
                      />
                    </Box>

                    <Box
                      display="flex"
                      flexWrap="wrap"
                      justifyContent="center"
                      width={1}
                      mt={10}
                    >
                      <Box mx={1} mb={7}>
                        <Button
                          variant="contained"
                          color="secondary"
                          type="submit"
                        >
                          Update
                        </Button>
                      </Box>
                      <Box mx={1}>
                        <Button
                          onClick={() => {
                            history.push('/ceo-message');
                          }}
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
      </WrapInCard>
    </WrapInBreadcrumbs>
  );
}

export default memo(AddCeoMessage);
