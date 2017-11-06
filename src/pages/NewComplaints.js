import React from 'react';
import { graphql } from 'react-apollo';
import { compose, setDisplayName } from 'recompose';
import ComplaintList from '../components/ComplaintList';
import NewComplaintsQuery from '../graphql/queries/NewComplaints';

const enhance = compose(
  setDisplayName('NewComplaintsPage'),
  graphql(NewComplaintsQuery, {
    name: 'newComplaintsQuery',
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
