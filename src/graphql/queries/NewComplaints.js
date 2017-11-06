import { gql } from 'react-apollo';
import { ComplaintListItemFragment } from '../../components/ComplaintListItem';

export default gql`
  query NewComplaintsQuery {
    complaints: allComplaints(
      orderBy: createdAt_DESC
    ) {
      ...ComplaintListItemFragment
    }
  }
  ${ComplaintListItemFragment}
`;