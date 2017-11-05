import React from 'react'
import Complaint from './Complaint'
import {
  graphql,
  gql
} from 'react-apollo'

const ComplaintList = ({ allComplaintsQuery = {} }) => {
  if (allComplaintsQuery.loading) {
    return <div>Loading</div>;
  }

  if (allComplaintsQuery.error) {
    return <div>Error</div>;
  }

  return (
    <div>
      {allComplaintsQuery.allComplaints.map(complaint => (
        <Complaint key={complaint.id} complaint={complaint} />
      ))}
    </div>
  );  
};

const ALL_ComplaintS_QUERY = gql`
  query AllComplaintsQuery {
    allComplaints {
      id
      createdAt
      url
      description
    }
  }
`

export default graphql(
  ALL_ComplaintS_QUERY,
  { name: 'allComplaintsQuery' }
)(ComplaintList)
