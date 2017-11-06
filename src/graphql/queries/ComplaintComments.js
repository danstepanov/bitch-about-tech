import { gql } from 'react-apollo';

export default gql`
  query ComplaintCommentsQuery(
    $complaintId: ID!
  ) {
    comments: allComments(
      filter: {
        complaint: {
          id: $complaintId
        }
      }
    ) {
      id
      body
      createdAt
      user {
        id
        name
      }
    }
  }
`;
