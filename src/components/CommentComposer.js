import React from 'react';
import { gql, graphql } from 'react-apollo';
import {
  compose,
  setDisplayName,
  withHandlers,
  withState,
} from 'recompose';
import withUserId from '../enhancers/withUserId';
import ComplaintCommentsQuery from '../graphql/queries/ComplaintComments';

const CreateCommentMutation = gql`
  mutation CreateCommentMutation(
    $body: String!
    $complaintId: ID!
    $parentCommentId: ID
    $userId: ID!
  ) {
    createComment(
      body: $body
      complaintId: $complaintId
      parentCommentId: $parentCommentId
      userId: $userId
    ) {
      id
    }
  }
`;

const enhance = compose(
  setDisplayName('CommentComposer'),
  withState('commentBody', 'setCommentBody'),
  withUserId('userId'),
  graphql(CreateCommentMutation, {
    name: 'createComment',
    options: ({
      commentBody,
      complaintId,
      parentCommentId,
      userId,
    }) => ({
      refetchQueries: [{
        query: ComplaintCommentsQuery,
        variables: { complaintId },
      }],
      variables: {
        body: commentBody,
        complaintId,
        parentCommentId,
        userId,
      },
    }),
  }),
  withHandlers({
    createComment: ({
      createComment,
      setCommentBody,
      userId,
    }) => async (e) => {
      e.preventDefault();

      if (!userId) {
        window.alert('Please sign in to comment');
        return;
      }

      await createComment();

      setCommentBody(undefined);
    }
  }),
);

export default enhance(({
  commentBody,
  createComment,
  setCommentBody,
}) => (
  <form onSubmit={createComment}>
    <div>
      <textarea
        className='mb2'
        onChange={(e) => setCommentBody(e.target.value)}
        value={commentBody}
      />
    </div>
    <button type="submit">
      Submit
    </button>
  </form>
));
