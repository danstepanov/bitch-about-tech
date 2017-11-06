import { gql, graphql } from 'react-apollo';
import React from 'react';
import { compose, setDisplayName } from 'recompose';
import CommentComposer from '../components/CommentComposer';
import CommentList from '../components/CommentList';
import ComplaintListItem, { ComplaintListItemFragment } from '../components/ComplaintListItem';
import ComplaintCommentsQuery from '../graphql/queries/ComplaintComments';

const ComplaintQuery = gql`
  query ComplaintQuery($complaintId: ID!) {
    complaint: Complaint(id: $complaintId) {
      ...ComplaintListItemFragment
    }
  }
  ${ComplaintListItemFragment}
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
  graphql(ComplaintCommentsQuery, {
    name: 'commentsQuery',
    options: ({ match: { params } }) => ({
      variables: {
        complaintId: params.complaintId,
      },
    }),
  }),
)

export default enhance(({
  commentsQuery = {},
  complaintQuery = {},
}) => {
  if (complaintQuery.loading) {
    return <div>Loading</div>;
  }

  if (complaintQuery.error) {
    console.error(complaintQuery.error);
    return <div>Error</div>;
  }

  const { complaint } = complaintQuery;

  return (
    <div>
      <ComplaintListItem complaint={complaint} />
      <div style={{ marginTop: 20 }}>
        {complaint.description}
      </div>
      <CommentComposer
        complaintId={complaint.id}
      />
      {!!commentsQuery.comments && (
        <div style={{ marginTop: 20 }}>
          <CommentList
            comments={commentsQuery.comments}
          />
        </div>
      )}
    </div>
  );
});
