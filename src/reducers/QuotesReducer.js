import {
    QUOTE_LOADED_OK
} from '../actions/SearchInputAction'



export const isFetching = (state=false, action) => {
    switch (action.type) {
        case QUOTE_LOADED_OK:
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
export const searchResult = (state=[], action) =>{
    switch (action.type) {
        case SUBMIT:
            return []
        case LOADED_OK:
            return [...action.result]
        default:
            return state
    }   
}