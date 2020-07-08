import { FETCH_USER } from '../actions/types';

export default function(state = null, action) {
    switch (action.type) {
        case FETCH_USER:
            // empty string || false -> false: return false instead of empty string
            // when the user has already logged out
            return action.payload || false;
        default:
            return state;
    }
}