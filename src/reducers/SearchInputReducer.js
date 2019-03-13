import {
    SUBMIT, LOADED_OK, LOADING, LOADED_FAIL, QUOTE_LOADED_OK
} from '../actions/SearchInputAction'



export const isFetching = (state=false, action) => {
    switch (action.type) {
        case SUBMIT:
            return true
        case LOADED_OK:
            return false
        case LOADED_FAIL:
            return false
        case LOADING:
            return true
        default:
            return state
    }
}
export const searchString = (state="", action) => {
    return action.searchString ? action.searchString : "";
}
function updateQuote(quotes, quote){
    var found = quotes.find(it=>{
        return it.data.symbol === quote.symbol;
    })
    found.isFetching = true;
    found.data = {...quote};
    
    return quotes;

}
export const quotes = (state=[], action) =>{
    switch (action.type) {
        case SUBMIT:
            return []
        case LOADED_OK:
            return [...action.quotes]
        case QUOTE_LOADED_OK:
            return [...updateQuote(state, action.quote)]
        default:
            return state
    }   
}