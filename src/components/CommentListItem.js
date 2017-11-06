import React from 'react';
import { setDisplayName } from 'recompose';
import { timeDifferenceForDate } from '../utils';

const enhance = setDisplayName('CommentListItem');

export default enhance(({
  comment,
}) => (
  <div>
    <div className='f6'>
      {comment.body}
    </div>
    <div className='f6 lh-copy gray'>
      by {comment.user.name} {timeDifferenceForDate(comment.createdAt)}
    </div>
  </div>
));
