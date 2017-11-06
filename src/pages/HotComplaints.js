import React from 'react';
import { graphql } from 'react-apollo';
import { compose, setDisplayName } from 'recompose';
import ComplaintList from '../components/ComplaintList';
import HotComplaintsQuery from '../graphql/queries/HotComplaints';

const enhance = compose(
  setDisplayName('HotComplaintsPage'),
  graphql(HotComplaintsQuery, {
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
