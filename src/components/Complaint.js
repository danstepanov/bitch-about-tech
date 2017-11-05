import React, { Component } from 'react'

export default class Complaint extends Component {
  render() {
    return (
      <div>
        <div>{this.props.complaint.description} ({this.props.complaint.url})</div>
      </div>
    )
  }

  _voteForComplaint = async () => {

  }
}
