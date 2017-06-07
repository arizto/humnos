
import * as t from './actionTypes';
import * as configs from '../../constants/configs';
import * as Db from '../../db/Db';
import { List, Map } from 'immutable';

export function setIdle() {
	return (dispatch) => {
	    dispatch({
      		type: t.IDLE
	    });
	}
}

export function getLagu() {

	return (dispatch) => {

	    dispatch({
      		type: t.LOADING_GET_LIST
	    });

	    Db.getLagu((data) => {

		    dispatch({
	      		type: t.GET_LIST_DONE,
	      		lists: data
		    });

  		});

	}
}

export function filterByID(isNew = false) {
	return (dispatch, getState) => {

		var type = ( isNew ) ? t.LOADING_FILTER : t.LOADING_FILTER_NEXT

	    dispatch({
      		type: type
	    });

	    var lists = getState().get('humnos').get('lists'),
	        limit = (isNew) ? 50 : 30,
	    	next = getState().get('humnos').get('filter').get('next'),
	    	stop = next + (limit - 1),
	    	newData = [],
	    	data = List([]);

	    data = lists.takeWhile((x,i) => i <= stop )
	    /*
	    //TESTING DATA
	    for(i = 1; i <= 30; i++) {
	    	newData.push({id : i, title: 'tes', no: i });	    	
	    }
	    data = getState().get('humnos').get('filter').get('data').concat(newData);
	    next = next + 1;
	    */
	    next = stop + 1;
	    
	    if( next > (lists.size - 1) )
	    {
	    	next = -1
	    }
	    
	    dispatch({
      		type: t.FILTER_DONE,
      		data: data,
      		text: false,
      		next: next
	    });

  		

	}
}

export function filterByText(keyword = '') {
	return (dispatch, getState) => {
		
	    dispatch({
      		type: t.LOADING_FILTER
	    });

	    var lists = getState().get('humnos').get('lists'),
	    	data = List([]);

	    if( keyword !== '' ) {
	    	data = lists.filter( x => filterLagu(x,keyword) );
	    }

	    //console.log(data.toArray());

	    dispatch({
      		type: t.FILTER_DONE,
      		data: data,
      		text: true,
      		next: 0
	    });

  		

	}
}

function filterLagu(item,keyword) {
  
  	return item.no.includes(keyword) || item.title.toLowerCase().includes(keyword);

}






