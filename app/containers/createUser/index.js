/**
 *
 * CreateUser
 *
 */

import { WrapInCard } from 'components';
import CreateNewUser from 'components/pages/createUser';
import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { createUser } from 'state/queryFunctions';
import WrapInBreadcrumbs from '../../components/layout/wrapInBreadcrumbs';
import { Toast } from '../../utils/helper';
import { ROLES } from '../../utils/constants';
import { useAuthContext } from '../../context/authContext';

function CreateUser() {
  const history = useHistory();
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();
  const mutation = useMutation(createUser, {
    onSuccess: () => {
      history.push({
        pathname: '/directory',
        state: {
          showToast: true,
          toastType: 'success',
          message: `User Created Successfully`,
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
  const defaultData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    contactNo: '',
    extension: '',
    title: '',
    location: '',
    department: '',
    joiningDate: null,
    dob: null,
    file: undefined,
    role: ROLES.USER,
  };

  defaultData.isProfilePicAttached = false;
  defaultData.passwordRequired = true;

  return (
    <>
      <Helmet>
        <title>Create User</title>
        <meta name="ftrv create user" content="ftrv user creation screen" />
      </Helmet>

      <WrapInBreadcrumbs>
        <WrapInCard>
          <CreateNewUser
            initialData={defaultData}
            mutation={mutation}
            onUpdateUser={handleSubmit}
            formType="add"
            editRole={role}
          />
        </WrapInCard>
      </WrapInBreadcrumbs>
    </>
  );
}

export default memo(CreateUser);
