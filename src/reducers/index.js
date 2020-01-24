import { combineReducers } from 'redux';

import dashboardGraphReducer from "./dashboardGraphReducer";
import dashboardGraphFilterReducer from "./dashboardGraphFilterReducer"


export default combineReducers({
    dashboardGraph: dashboardGraphReducer,
    dashboardGraphFilter: dashboardGraphFilterReducer
});