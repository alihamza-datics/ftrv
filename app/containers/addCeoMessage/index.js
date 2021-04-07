import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import AddCeoMessageInfo from '../../components/pages/updateCeoMessage';

function AddCeoMessage() {
  const defaultData = {
    file: undefined,
  };
  return (
    <>
      <Helmet>
        <title>Ceo Message</title>
      </Helmet>

      <AddCeoMessageInfo initialData={defaultData} />
    </>
  );
}

export default memo(AddCeoMessage);
