import { gql, graphql } from 'react-apollo';
import React from 'react';

export default ({
  complaint,
}) => (
  <div>
    <div>{complaint.title}</div>
    <div>{complaint.description}</div>
    <div>{complaint.url}</div>
  </div>
);
