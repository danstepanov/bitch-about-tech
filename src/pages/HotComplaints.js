import React from 'react';
import { gql, graphql } from 'react-apollo';
import { compose, setDisplayName } from 'recompose';
import ComplaintList from '../components/ComplaintList';

const HotComplaintsQuery = gql`
  query HotComplaintsQuery {
    complaints: allComplaints {
      id
      createdAt
      description
      postedBy {
        id
        name
      }
      title
      url
      votes {
        id
        user {
          id
        }
      }
    }
  }
`

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
