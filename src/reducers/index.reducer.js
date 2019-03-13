import { combineReducers } from 'redux'
import {isFetching, searchString, quotes} from './SearchInputReducer'
const rootReducer = combineReducers({
    searchString,
    isFetching,
    quotes

})
export default rootReducer