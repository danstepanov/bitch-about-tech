import { gql } from 'react-apollo';

export default gql`
  query ComplaintsListQuery {
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
`;
