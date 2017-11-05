import { gql, graphql } from 'react-apollo';
import React from 'react';
import { compose, setDisplayName } from 'recompose';
import ComplaintListItem from '../components/ComplaintListItem';

const ComplaintQuery = gql`
  query ComplaintQuery($complaintId: ID!) {
    Complaint(id: $complaintId) {
      id
      description
      title
      url
    }
  }
`;

const enhance = compose(
  setDisplayName('ComplaintPage'),
  graphql(ComplaintQuery, {
    name: 'complaintQuery',
    options: ({ match: { params } }) => ({
      variables: {
        complaintId: params.complaintId,
      },
    }),
  }),
)

export default enhance(({
  complaintQuery = {},
}) => {
  if (complaintQuery.loading) {
    return <div>Loading</div>;
  }

  if (complaintQuery.error) {
    console.error(complaintQuery.error);
    return <div>Error</div>;
  }

  const complaint = complaintQuery.Complaint;

  return (
    <div>
      <ComplaintListItem complaint={complaint} />
      <div style={{ marginTop: 20 }}>{complaint.description}</div>
    </div>
  );
});
