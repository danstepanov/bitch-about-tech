import { withProps } from 'recompose';
import { LOCALSTORAGE_KEY_USER_ID } from '../constants';

export default (propName: string) => withProps({
  [propName]: localStorage.getItem(LOCALSTORAGE_KEY_USER_ID),
});
