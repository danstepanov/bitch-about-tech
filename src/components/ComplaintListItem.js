import React from 'react';
import { gql, graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import { isNumber } from 'lodash';
import {
  compose,
  setDisplayName,
  withHandlers,
} from 'recompose';
import withUserId from '../enhancers/withUserId';
import { timeDifferenceForDate } from '../utils';

export const ComplaintListItemFragment = gql`
  fragment ComplaintListItemFragment on Complaint {
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
    _commentsMeta { count }
    _votesMeta { count }
  }
`;

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
        {isNumber(index) && (
          <span className='gray'>
            {index + 1}.
          </span>
        )}
        {!!userId && (
          <a
            className='ml1 gray f11'
            onClick={voteForComplaint}
            style={{ cursor: 'pointer' }}
          >
            ▲
          </a>
        )}
      </div>
      <div className='ml1'>
        <Link to={`/complaints/${complaint.id}`}>
          {complaint.title}
        </Link>
        <div className='f6 lh-copy gray'>
          ({complaint.url})
        </div>
        <div className='f6 lh-copy gray'>
          {complaint._votesMeta.count} votes | {complaint._commentsMeta.count} comments | by {complaint.postedBy ? complaint.postedBy.name: 'Anonymous'} {timeDifferenceForDate(complaint.createdAt)}
        </div>
      </div>
    </div>
  </div>
));
