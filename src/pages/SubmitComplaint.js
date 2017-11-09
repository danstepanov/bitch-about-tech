import React from 'react';
import { gql, graphql } from 'react-apollo';
import { compose, setDisplayName, withHandlers, withState } from 'recompose';
import { LOCALSTORAGE_KEY_USER_ID } from '../constants';
import withUserId from '../enhancers/withUserId';

const CreateComplaintMutation = gql`
  mutation CreateComplaintMutation(
    $description: String
    $postedById: ID!
    $title: String!
    $url: String!
  ) {
    createComplaint(
      description: $description
      postedById: $postedById
      title: $title
      url: $url
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
`;

const enhance = compose(
  setDisplayName('SubmitComplaintPage'),
  graphql(CreateComplaintMutation, {
    options: { refetchQueries: ['AllComplaintsQuery'] },
    name: 'createComplaintMutation',
  }),
  withState('description', 'setDescription'),
  withState('title', 'setTitle'),
  withState('url', 'setURL'),
  withHandlers({
    createComplaint: ({
      createComplaintMutation,
      description,
      history,
      title,
      url,
    }) => async (e) => {
      e.preventDefault();

      const userId = localStorage.getItem(LOCALSTORAGE_KEY_USER_ID);

      if (!userId) {
        window.alert('Please sign in to create a complaint');
        return;
      }

      await createComplaintMutation({
        variables: {
          description,
          postedById: userId,
          title,
          url,
        }
      });

      history.push('/');
    }
  }),
  withUserId('userId'),
);

export default enhance(({
  createComplaint,
  description,
  setDescription,
  setTitle,
  setURL,
  title,
  url,
  userId,
}) => (
  <div>
    <form
      className='flex flex-column mt3'
      onSubmit={createComplaint}
    >
      <input
        className='mb2'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type='text'
        placeholder='A title for the complaint'
      />
      <textarea
        className='mb2'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder='An optional description for the complaint'
      />
      <input
        className='mb2'
        value={url}
        onChange={(e) => setURL(e.target.value)}
        type='text'
        placeholder='The URL for the complaint'
      />
      {!userId && (
        <div>
          Create account (goes here)
        </div>
      )}
      <button type="submit">
        Submit
      </button>
    </form>
  </div>
));
