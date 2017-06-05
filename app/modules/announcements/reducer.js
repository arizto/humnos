
import * as t from './actionTypes';
import { List, Map } from 'immutable';



const initialState = Map({
    lists: List([]),
    api: Map({
        status: false,
        message: ''
    }),
    status: 'IDLE'
});


export default function reducer(state = initialState, action) {
  	switch (action.type) {
  		case t.IDLE:
            return state.set('status', 'IDLE');
            break;
        case t.LOADING_GET_LIST:
            return state.merge(Map({ lists: List([]), api: Map({status: false, message: ''}), status: 'LOADING_GET_LIST' }));
            break;
        case t.GET_LIST_DONE:
            return state.merge(Map({ lists: List(action.lists), api: Map(action.api), status: 'GET_LIST_DONE' }));
            break;
        default:
        	return state;
  	}
};