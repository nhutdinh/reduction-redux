import { combineReducers } from 'redux'
import {search} from './SearchInputReducer'
import {quotesHistory} from './QuotesReducer'
const rootReducer = combineReducers({
    search,
    quotesHistory

})
export default rootReducer