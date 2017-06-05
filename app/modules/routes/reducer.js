
import * as t from './actionTypes';
import { List, Map } from 'immutable';



const initialState = Map({
    status: 'IDLE'
});


export default function reducer(state = initialState, action) {
  	switch (action.type) {
  		case t.SET_STATUS:
            return state.set('status', action.status);
            break;
        default:
        	return state;
  	}
};