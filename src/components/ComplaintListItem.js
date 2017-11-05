import React, { Component } from 'react'

export default ({
  complaint,
}) => (
  <div>
    {complaint.description} ({complaint.url})
  </div>
);