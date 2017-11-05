import React from 'react';
import { setDisplayName } from 'recompose';

const enhance = setDisplayName('ComplaintListItem');

export default enhance(({
  complaint,
}) => (
  <div>
    {complaint.title} ({complaint.url})
  </div>
));
