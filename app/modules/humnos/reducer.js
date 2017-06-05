
import * as t from './actionTypes';
import { List, Map } from 'immutable';



const initialState = Map({
    lists: List([]),
    filter: Map({
        data: List([]),
        text: false,
        next: 0
    }),
    status: 'IDLE'
});


export default function reducer(state = initialState, action) {
  	switch (action.type) {
  		case t.IDLE:
            return state.set('status', 'IDLE');
            break;
        case t.LOADING_GET_LIST:
            return state.merge(Map({ lists: List([]), status: 'LOADING_GET_LIST' }));
            break;
        case t.GET_LIST_DONE:
            return state.merge(Map({ lists: List(action.lists), status: 'GET_LIST_DONE' }));
            break;
        case t.LOADING_FILTER:
            return state.merge(Map({ filter: Map({ data: List([]), text: false, next: 0 }), status: 'LOADING_FILTER' }));
            break;
        case t.LOADING_FILTER_NEXT:
            return state.merge(Map({ status: 'LOADING_FILTER_NEXT' }));
            break;
        case t.FILTER_DONE:
            return state.merge(Map({ filter:  Map({ data: action.data, text: action.text, next: action.next }), status: 'FILTER_DONE' }));
            break;
        default:
        	return state;
  	}
};