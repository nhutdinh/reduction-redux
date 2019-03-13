import {
  SEARCH_LOADED_OK, SEARCH_LOADING, SEARCH_LOADED_FAIL, QUOTE_DETAIL_LOADED_OK
} from '../actions/SearchInputAction'



export const search = (state={quotes: [], searchString: "", isFetching: false}, action) => {
    switch (action.type) {
        case QUOTE_DETAIL_LOADED_OK:
            return {...state, quotes: [...updateQuote(state.quotes, action.quote)]}
        case SEARCH_LOADED_OK:
            return {...state, quotes: [...action.quotes], isFetching: false}
        case SEARCH_LOADED_FAIL:
            return {...state, quotes: [], isFetching: false}
        case SEARCH_LOADING:
            return {...state, searchString: action.searchString, isFetching: true}
        default:
            return state
    }
}

function updateQuote(quotes, quote){
    var found = quotes.find(it=>{
        return it.data.symbol === quote.symbol;
    })
    found.isLoading = false;
    found.data = {...quote};
    
    return quotes;

}