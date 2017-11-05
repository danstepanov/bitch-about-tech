import React, { Component } from 'react'

export default ({
  complaint,
}) => (
  <div>
    {complaint.title} ({complaint.url})
  </div>
);