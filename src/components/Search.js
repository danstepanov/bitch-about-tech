import React from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import {
  compose,
  setDisplayName,
  withHandlers,
  withState,
} from 'recompose';
import ComplaintListItem, { ComplaintListItemFragment } from './ComplaintListItem';

const ALL_COMPLAINTS_SEARCH_QUERY = gql`
  query AllComplaintsSearchQuery($searchText: String!) {
    allComplaints(filter: {
      OR: [{
        url_contains: $searchText
      }, {
        description_contains: $searchText
      }]
    }) {
      ...ComplaintListItemFragment
    }
  }
  ${ComplaintListItemFragment}
`;
const enhance = compose(
  setDisplayName('Search'),
  withState('complaints', 'setComplaints', []),
  withState('searchText', 'setSearchText', ''),
  withApollo,
  withHandlers({
    executeSearch: ({
      client,
      searchText,
      setComplaints,
    }) => async () => {
      const result = await client.query({
        query: ALL_COMPLAINTS_SEARCH_QUERY,
        variables: { searchText }
      });
      const complaints = result.data.allComplaints;
      setComplaints(complaints);
    }
  }),
);

export default enhance(({
  complaints,
  executeSearch,
  setComplaints,
  setSearchText,
}) => (
  <div>
    <div>
      Search
      <input
        type='text'
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button
        onClick={executeSearch}
      >
        OK
      </button>
    </div>
    {complaints.map((complaint, index) => <ComplaintListItem key={complaint.id} complaint={complaint} index={index}/>)}
  </div>
));
