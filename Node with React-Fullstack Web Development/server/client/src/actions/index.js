import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user')
    // after request resolved and we get a response back
    // dispatch an action
    dispatch({ type: FETCH_USER, payload: res.data });
};