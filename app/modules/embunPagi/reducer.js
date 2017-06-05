
import * as t from './actionTypes';
import { List, Map } from 'immutable';



const initialState = Map({
    detail: Map({}),
    lists: List([]),
    api: Map({
        status: false,
        message: ''
    }),
    page: 1,
    next: null,
    status: 'IDLE'
});


export default function reducer(state = initialState, action) {
  	switch (action.type) {
  		case t.IDLE:
            return state.set('status', 'IDLE');
            break;
        case t.LOADING_GET_LIST:
            return state.merge(Map({ lists: List([]), api: Map({status: false, message: ''}), page: 1, next:null, status: 'LOADING_GET_LIST' }));
            break;
        case t.LOADING_GET_LIST_NEXT:
            return state.merge(Map({ api: Map({status: false, message: ''}), status: 'LOADING_GET_LIST_NEXT' }));
            break;
        case t.GET_LIST_DONE:
            return state.merge(Map({ lists: state.get('lists').concat(action.lists), api: Map(action.api), next: action.next, status: 'GET_LIST_DONE' }));
            break;
        case t.LOADING_GET_UPDATE:
            return state.merge(Map({ api: Map({status: false, message: ''}), status: 'LOADING_GET_UPDATE' }));
            break;
        case t.GET_UPDATE_DONE:
            return state.merge(Map({ lists: action.lists.concat(state.get('lists')), api: Map(action.api), status: 'GET_UPDATE_DONE' }));
            break;
        default:
        	return state;
  	}
};