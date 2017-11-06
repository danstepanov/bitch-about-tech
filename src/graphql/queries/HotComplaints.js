import { gql } from 'react-apollo';
import { ComplaintListItemFragment } from '../../components/ComplaintListItem';

export default gql`
  query HotComplaintsQuery {
    complaints: allComplaints {
      ...ComplaintListItemFragment
    }
  }
  ${ComplaintListItemFragment}
`;