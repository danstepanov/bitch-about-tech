import { gql } from 'react-apollo';
import { ComplaintListItemFragment } from '../../components/ComplaintListItem';
// createdAt_DESC
export default gql`
  query AllComplaintsQuery(
    $orderBy: ComplaintOrderBy
  ) {
    complaints: allComplaints(
      orderBy: $orderBy
    ) {
      ...ComplaintListItemFragment
    }
  }
  ${ComplaintListItemFragment}
`;
