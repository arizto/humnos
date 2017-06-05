
import * as t from './actionTypes';
import * as configs from '../../constants/configs';
import { List, Map } from 'immutable';

export function setStatus(status = '') {
	return (dispatch) => {
	    dispatch({
      		type: t.SET_STATUS,
      		status: status
	    });
	}
}








