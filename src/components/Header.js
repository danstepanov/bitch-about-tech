import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import {
  compose,
  setDisplayName,
  withHandlers,
} from 'recompose';
import {
  LOCALSTORAGE_KEY_AUTHENTICATION_TOKEN,
  LOCALSTORAGE_KEY_USER_ID,
} from '../constants';
import withUserId from '../enhancers/withUserId';

const enhance = compose(
  setDisplayName('Header'),
  withRouter,
  withUserId('userId'),
  withHandlers({
    signOut: ({ history }) => () => {
      localStorage.removeItem(LOCALSTORAGE_KEY_AUTHENTICATION_TOKEN);
      localStorage.removeItem(LOCALSTORAGE_KEY_USER_ID);

      history.push('/');
    }
  }),
);

export default enhance(({
  signOut,
  userId,
}) => (
  <div className='flex pa1 justify-between nowrap red'>
    <div className='flex flex-fixed black'>
      <Link to='/' className='ml1 no-underline black'>
        <div className='fw7 mr1'>Bitch About Tech</div>
      </Link>
      <Link to='/new' className='ml1 no-underline black'>
        new
      </Link>
      <div className='ml1'>|</div>
      <Link to='/submit' className='ml1 no-underline black'>submit</Link>
    </div>
    <div className='flex flex-fixed'>
      {userId
        ? <div className='ml1 pointer black' onClick={signOut}>sign out</div>
        : <Link to='/sign-in' className='ml1 no-underline black'>sign in</Link>}
    </div>
  </div>
));
