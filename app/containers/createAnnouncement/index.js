import { WrapInCard } from 'components';
import CreateAnnouncementInfo from 'components/pages/createAnnouncement';
import { useHistory } from 'react-router-dom';
import React, { memo } from 'react';
import { useMutation } from 'react-query';
import { Helmet } from 'react-helmet';
import { createAnnouncement } from '../../state/queryFunctions';
import { Toast } from '../../utils/helper';

import WrapInBreadcrumbs from '../../components/layout/wrapInBreadcrumbs';

function CreateAnnouncement() {
  const defaultData = {
    title: '',
    description: '',
    startTime: new Date(),
    endTime: new Date(),
    status: 'active',
    priority: '',
  };
  const history = useHistory();
  const mutation = useMutation(createAnnouncement, {
    onSuccess: () => {
      history.push({
        pathname: '/announcement',
        state: {
          showToast: true,
          toastType: 'success',
          message: `Announcement Created Successfully`,
        },
      });
    },
    onError: ({
      response: {
        data: { message },
      },
    }) => {
      Toast({
        icon: 'error',
        title: message,
      });
    },
  });
  const handleSubmit = (payload) => {
    mutation.mutate(payload);
  };

  return (
    <>
      <Helmet>
        <title>Create Announcement</title>
        <meta
          name="ftrv create announcement"
          content="ftrv Announcement creation screen"
        />
      </Helmet>

      <WrapInBreadcrumbs>
        <WrapInCard>
          <CreateAnnouncementInfo
            initialValues={defaultData}
            onUpdateAnnouncement={handleSubmit}
            formType="add"
          />
        </WrapInCard>
      </WrapInBreadcrumbs>
    </>
  );
}

export default memo(CreateAnnouncement);
