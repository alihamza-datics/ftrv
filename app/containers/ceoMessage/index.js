import { WrapInCard } from 'components';
import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import CeoMessageInfo from '../../components/pages/ceoMessage';

import WrapInBreadcrumbs from '../../components/layout/wrapInBreadcrumbs';

function CeoMessage() {
  return (
    <>
      <Helmet>
        <title>Ceo Message</title>
        <meta name="ftrv ceo message" content="ftrv ceo message screen" />
      </Helmet>

      <WrapInBreadcrumbs>
        <WrapInCard>
          <CeoMessageInfo />
        </WrapInCard>
      </WrapInBreadcrumbs>
    </>
  );
}

export default memo(CeoMessage);
