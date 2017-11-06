import React from 'react';
import { setDisplayName } from 'recompose';
import ComplaintListItem from './ComplaintListItem';

const enhance = setDisplayName('ComplaintList');

export default enhance(({
  complaints,
}) => (
  <div>
    {complaints.map((complaint, index) => (
      <ComplaintListItem
        complaint={complaint}
        index={index}
        key={complaint.id}
      />
    ))}
  </div>
));
