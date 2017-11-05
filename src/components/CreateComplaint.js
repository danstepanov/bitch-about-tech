import React, { Component } from 'react'
import {
  graphql,
  gql
} from 'react-apollo'
import { LOCALSTORAGE_KEY_USER_ID } from '../constants'

class CreateComplaint extends Component {
  state = {
    description: '',
    url: ''
  }

  render() {
    return (
      <div>
        <div className='flex flex-column mt3'>
          <input
            className='mb2'
            value={this.state.description}
            onChange={(e) => this.setState({ description: e.target.value })}
            type='text'
            placeholder='A description for the complaint'
          />
          <input
            className='mb2'
            value={this.state.url}
            onChange={(e) => this.setState({ url: e.target.value })}
            type='text'
            placeholder='The URL for the complaint'
          />
          <button
            onClick={() => this._createComplaint()}
          >
            Submit
          </button>
        </div>
      </div>
    )
  }

  _createComplaint = async () => {
    const postedById = localStorage.getItem(LOCALSTORAGE_KEY_USER_ID)
    if (!postedById) {
      console.error('No user logged in')
      return
    }
    const {
      description,
      url
    } = this.state
    await this.props.createComplaintMutation({
      variables: {
        description,
        url,
        postedById
      }
    })
    this.props.history.push('/')
  }
}

const CREATE_COMPLAINT_MUTATION = gql`
  mutation CreateComplaintMutation($description: String!, $url: String!, $postedById: ID!) {
    createComplaint(
      description: $description,
      url: $url,
      postedById: $postedById
    ) {
      id
      createdAt
      url
      description
      postedBy {
        id
        name
      }
    }
  }
`

export default graphql(
  CREATE_COMPLAINT_MUTATION,
  { name: 'createComplaintMutation' }
)(CreateComplaint)
