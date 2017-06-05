//import { combineReducers } from 'redux'
import { combineReducers } from 'redux-immutable';

import humnos from './modules/humnos'
import announcements from './modules/announcements'
import garamKeluarga from './modules/garamKeluarga'
import embunPagi from './modules/embunPagi'
import routes from './modules/routes'

const rootReducer = combineReducers({
	[humnos.constants.NAME]: humnos.reducer,
	[announcements.constants.NAME]: announcements.reducer,
	[garamKeluarga.constants.NAME]: garamKeluarga.reducer,
	[embunPagi.constants.NAME]: embunPagi.reducer,
	[routes.constants.NAME]: routes.reducer
});

export default rootReducer;