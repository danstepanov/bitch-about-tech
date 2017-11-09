import React from 'react';
import { graphql } from 'react-apollo';
import { compose, setDisplayName } from 'recompose';
import ComplaintList from '../components/ComplaintList';
import AllComplaintsQuery from '../graphql/queries/AllComplaints';

const enhance = compose(
  setDisplayName('NewComplaintsPage'),
  graphql(AllComplaintsQuery, {
    name: 'newComplaintsQuery',
    options: {
      variables: {
        orderBy: 'createdAt_DESC',
      }
    }
  }),
);

export default enhance(({
  newComplaintsQuery = {},
}) => {
  if (newComplaintsQuery.loading) {
    return <div>Loading</div>;
  }

  if (newComplaintsQuery.error) {
    return <div>Error</div>;
  }

  return (
    <ComplaintList
      complaints={newComplaintsQuery.complaints}
    />
  );
});
