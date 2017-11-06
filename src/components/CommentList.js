import React from 'react';
import { setDisplayName } from 'recompose';
import CommentListItem from './CommentListItem';

const enhance = setDisplayName('CommentList');

export default enhance(({
  comments,
}) => (
  <div>
    {comments.map((comment, index) => (
      <CommentListItem
        comment={comment}
        index={index}
        key={comment.id}
      />
    ))}
  </div>
));
