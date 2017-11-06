import React from 'react';
import { gql, graphql } from 'react-apollo';
import {
  compose,
  setDisplayName,
  withHandlers,
} from 'recompose';
import withUserId from '../enhancers/withUserId';
import { timeDifferenceForDate } from '../utils';

const CreateVoteMutation = gql`
  mutation CreateVoteMutation(
    $complaintId: ID!
    $userId: ID!
  ) {
    createVote(
      complaintId: $complaintId
      userId: $userId
    ) {
      id
      complaint {
        id
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;

const enhance = compose(
  setDisplayName('ComplaintListItem'),
  graphql(CreateVoteMutation, {
    options: {
      refetchQueries: [
        'HotComplaintsQuery',
        'NewComplaintsQuery',
      ],
    },
    name: 'createVoteMutation',
  }),
  withUserId('userId'),
  withHandlers({
    voteForComplaint: ({
      complaint,
      createVoteMutation,
      updateStoreAfterVote,
      userId,
    }) => async () => {
      const voterIds = complaint.votes.map(vote => vote.user.id);

      if (voterIds.includes(userId)) {
        console.log(`User ${userId} already upvoted this complaint.`);
        return;
      }

      await createVoteMutation({
        variables: {
          complaintId: complaint.id,
          userId,
        },
      })
    }
  }),
);

export default enhance(({
  complaint,
  index,
  userId,
  voteForComplaint,
}) => (
  <div>
    <div className='flex mt2 items-start'>
      <div className='flex items-center'>
        <span className='gray'>{index + 1}.</span>
        {userId && <div className='ml1 gray f11' onClick={voteForComplaint}>▲</div>}
      </div>
      <div className='ml1'>
        <div>{complaint.title} ({complaint.url})</div>
        <div className='f6 lh-copy gray'>{complaint.votes.length} votes | by {complaint.postedBy ? complaint.postedBy.name: 'Anonymous'} {timeDifferenceForDate(complaint.createdAt)}</div>
      </div>
    </div>
  </div>
));
