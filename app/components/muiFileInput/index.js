import { Box, Button, Tooltip } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import {
  MIN_UPLOADABLE_FILE_SIZE_IN_MBS,
  MAX_UPLOADABLE_FILE_SIZE_IN_MBS,
} from '../../utils/constants';
import { Toast } from '../../utils/helper';

export function MuiFileInput({
  setImgFile,
  mutation,
  setFieldValue,
  name,
  acceptTypes,
  toolTipTitle = 'Select File',
  buttonText = 'Upload',
  BtnIcon,
}) {
  const inputEl = useRef(null);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    if (error) {
      Toast({
        icon: 'error',
        title: error,
      });
    }
  }, [error]);

  const handleCapture = ({ target }) => {
    if (target.files[0]) {
      if (
        target.files[0].size / 1024 / 1024 <=
        MIN_UPLOADABLE_FILE_SIZE_IN_MBS
      ) {
        setError('Error: File is empty');
      } else if (
        target.files[0].size / 1024 / 1024 >=
        MAX_UPLOADABLE_FILE_SIZE_IN_MBS
      ) {
        setError('Error: File size too large');
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(target.files[0]);
        reader.onloadend = () => {
          setImgFile(reader.result);
        };
        setFieldValue(name, target.files[0]);
        setError(null);
      }
    }
  };
  const handleClick = () => {
    inputEl.current.click();
  };

  return (
    <>
      <Box mb={2}>
        <input
          id={name}
          type="file"
          onChange={handleCapture}
          hidden
          ref={inputEl}
          accept={acceptTypes}
        />
        <Tooltip title={toolTipTitle}>
          <label htmlFor={name}>
            <Button
              color="secondary"
              onClick={handleClick}
              variant="contained"
              startIcon={BtnIcon && <BtnIcon fontSize="small" />}
              disabled={mutation.isLoading}
            >
              {buttonText}
            </Button>
          </label>
        </Tooltip>
      </Box>
    </>
  );
}
