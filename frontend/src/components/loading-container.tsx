import { StyledProps } from '@/types/styled-props';
import { ApolloError } from '@apollo/react-hooks';
import { Backdrop, CircularProgress } from '@material-ui/core';
import React, { ReactNode } from 'react';

const LoadingContainer = (props: { children: ReactNode; loading: boolean; error?: ApolloError } & StyledProps) => {
  return (
    <div className={props.className}>
      {props.loading ? (
        <Backdrop open={props.loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : props.error != null ? (
        props.error.message
      ) : (
        <div>{props.children}</div>
      )}

      {/* {
        loading ? 
      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop> : error != null ? <ErrorPage
      {children} */}
    </div>
  );
};
export default LoadingContainer;
