import React from 'react';
import { graphql } from 'react-apollo';
import { compose, setDisplayName } from 'recompose';
import ComplaintList from '../components/ComplaintList';
import AllComplaintsQuery from '../graphql/queries/AllComplaints';

const enhance = compose(
  setDisplayName('AllComplaintsPage'),
  graphql(AllComplaintsQuery, {
    name: 'hotComplaintsQuery',
  }),
);

export default enhance(({
  hotComplaintsQuery = {},
}) => {
  if (hotComplaintsQuery.loading) {
    return <div>Loading</div>;
  }

  if (hotComplaintsQuery.error) {
    return <div>Error</div>;
  }

  return (
    <ComplaintList
      complaints={hotComplaintsQuery.complaints}
    />
  );
});
