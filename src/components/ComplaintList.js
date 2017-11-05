import React from 'react';
import { gql, graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import { compose, setDisplayName } from 'recompose';
import ComplaintListItem from './ComplaintListItem';

const AllComplaintsQuery = gql`
  query AllComplaintsQuery {
    allComplaints {
      id
      createdAt
      description
      title
      url
    }
  }
`

const enhance = compose(
  setDisplayName('ComplaintList'),
  graphql(AllComplaintsQuery, {
    name: 'allComplaintsQuery',
  }),
);

export default enhance(({
  allComplaintsQuery = {},
}) => {
  if (allComplaintsQuery.loading) {
    return <div>Loading</div>;
  }

  if (allComplaintsQuery.error) {
    return <div>Error</div>;
  }

  return (
    <div>
      {allComplaintsQuery.allComplaints.map(complaint => (
        <Link
          key={complaint.id}
          to={`/complaints/${complaint.id}`}
        >
          <ComplaintListItem complaint={complaint} />
        </Link>
      ))}
    </div>
  );  
});
