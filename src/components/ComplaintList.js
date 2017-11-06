import React from 'react';
import { Link } from 'react-router-dom';
import { setDisplayName } from 'recompose';
import ComplaintListItem from './ComplaintListItem';

const enhance = setDisplayName('ComplaintList');

export default enhance(({
  complaints,
}) => (
  <div>
    {complaints.map(complaint => (
      <Link
        key={complaint.id}
        to={`/complaints/${complaint.id}`}
      >
        <ComplaintListItem complaint={complaint} />
      </Link>
    ))}
  </div>
));
