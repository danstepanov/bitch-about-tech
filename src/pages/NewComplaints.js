import React from 'react';
import { gql, graphql } from 'react-apollo';
import { compose, setDisplayName } from 'recompose';
import ComplaintList from '../components/ComplaintList';

const NewComplaintsQuery = gql`
  query NewComplaintsQuery {
    complaints: allComplaints(
      orderBy: createdAt_DESC
    ) {
      id
      createdAt
      description
      title
      url
    }
  }
`

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
