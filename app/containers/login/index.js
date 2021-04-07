/**
 *
 * LoginContainer
 *
 */

import React, { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { Login } from '../../components/pages/login';
import { login } from '../../state/queryFunctions';
import { useAuthContext } from '../../context/authContext';

function LoginContainer() {
  const mutation = useMutation((values) => login(values));
  const { data, isError, isSuccess, error } = mutation;
  const { user, setUser } = useAuthContext();
  const history = useHistory();

  if (isSuccess) {
    const updatedUser = {
      ...user,
      data: data.data.data,
      isAuthenticated: true,
      token: data.data.data.token,
    };
    setUser(updatedUser);
  }

  useEffect(() => {
    if (user.isAuthenticated) {
      history.push('/home');
    }
  }, [user.isAuthenticated]);

  const handleSubmit = (values) => {
    mutation.mutate(values);
  };
  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Description of Login" />
      </Helmet>
      <Login
        onHandleSubmit={handleSubmit}
        isError={isError}
        errorMessage={error && error.response.data.message}
      />
    </>
  );
}

export default memo(LoginContainer);
