import { StyledProps } from '@/types/styled-props';
import { ApolloError } from '@apollo/client';
import { Backdrop, CircularProgress } from '@material-ui/core';
import React, { ReactNode } from 'react';

const LoadingContainer = (props: { children: ReactNode; loading: boolean; error?: ApolloError } & StyledProps) => {
  return props.loading ? (
    <Backdrop open={props.loading}>
      <CircularProgress color="primary" />
    </Backdrop>
  ) : props.error != null ? (
    <>props.error.message</>
  ) : (
    <>{props.children}</>
  );
};
export default LoadingContainer;
