
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

export function gets() {

	return (dispatch) => {

	    dispatch({
      		type: t.LOADING_GET_LIST
	    });

	    const url = `${configs.server_api}announcements/lists`

	    get(url,(result) => {
	    	
	    	var data = [];

	    	if( result.status ) 
		    	data = result.records

		    dispatch({
	      		type: t.GET_LIST_DONE,
	      		lists: data,
	      		api: {
	      			status: result.status,
	      			message: result.message
	      		}
		    });

		})

	}
}






