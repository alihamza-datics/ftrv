import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loading = () => (
  <CircularProgress
    style={{ position: 'fixed', marginLeft: '40%', marginTop: '20%' }}
    size={60}
    color="primary"
  />
);

export { Loading };
