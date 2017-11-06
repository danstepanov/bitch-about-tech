import React from 'react';
import { Link } from 'react-router-dom';
import { setDisplayName } from 'recompose';
import ComplaintListItem from './ComplaintListItem';

const enhance = setDisplayName('ComplaintList');

export default enhance(({
  complaints,
}) => (
  <div>
    {complaints.map((complaint, index) => (
      <Link
        key={complaint.id}
        to={`/complaints/${complaint.id}`}
      >
        <ComplaintListItem
          complaint={complaint}
          index={index}
        />
      </Link>
    ))}
  </div>
));
