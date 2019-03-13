import {
    QUOTE_HISTORY_LOADING,
    QUOTE_HISTORY_LOADED_OK,
    QUOTE_HISTORY_LOADED_FAIL,

} from '../actions/StockPageAction'


export const quotesHistory = (state={isLoading: false, records: [], period: ""}, action) => {
    switch (action.type) {
        case QUOTE_HISTORY_LOADED_OK:
            return {...state, isLoading: false, records: action.data}
        case QUOTE_HISTORY_LOADED_FAIL:
            return {...state, isLoading: false}
        case QUOTE_HISTORY_LOADING:
            return {...state, isLoading: true, period: action.period}
        default:
            return state
    }
}
