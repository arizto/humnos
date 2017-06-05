
import * as t from './actionTypes';
import * as configs from '../../constants/configs';
import { get } from '../../api/api';
import { List, Map } from 'immutable';

export function setIdle() {
	return (dispatch) => {
	    dispatch({
      		type: t.IDLE
	    });
	}
}

export function gets(isNew = false) {

	return (dispatch, getState) => {

		if( !isNew && getState().get('embunPagi').get('next') === null  ) {
			dispatch({
	      		type: t.GET_LIST_DONE,
	      		lists: [],
	      		next: null,
	      		api: {
	      			status: false,
	      			message: ''
	      		}
		    });

		    return
		}

		var type = ( isNew ) ? t.LOADING_GET_LIST : t.LOADING_GET_LIST_NEXT;

	    dispatch({
      		type: type
	    });

	    var date_next = ( isNew ) ? '' : getState().get('embunPagi').get('next');

	    const url = `${configs.server_api}embun_pagi/lists?date_next=${date_next}`

	    get(url,(result) => {
	    	
	    	var data = [],
	    	    lists = getState().get('embunPagi').get('lists').toArray(),
	    		next = null;

	    	if( result.status ) {
	    		data = result.records
	    		next = result.next
	    	}
		    	

		    dispatch({
	      		type: t.GET_LIST_DONE,
	      		lists: data,
	      		next: next,
	      		api: {
	      			status: result.status,
	      			message: result.message
	      		}
		    });

		})

	}
}

export function getUpdate() {

	return (dispatch, getState) => {

	    dispatch({
      		type: t.LOADING_GET_UPDATE
	    });

	    var lists = getState().get('embunPagi').get('lists').toArray(),
	    	date = lists[0].date;

	    const url = `${configs.server_api}embun_pagi/lists_update?date=${date}`

	    get(url,(result) => {
	    	
	    	var data = [],
	    	    newData = [],
	    		next = null;

	    	if( result.status ) {
	    		
	    		data = result.records.reverse()
	    	}

		    dispatch({
	      		type: t.GET_UPDATE_DONE,
	      		lists: List(data),
	      		api: {
	      			status: result.status,
	      			message: result.message
	      		}
		    });

		})

	}
}






