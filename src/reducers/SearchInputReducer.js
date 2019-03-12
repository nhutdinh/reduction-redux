import {
    SUBMIT, LOADED, LOADING
} from '../actions/SearchInputAction'



export const isFetching = (state = false, action) => {
    switch (action.type) {
        case SUBMIT:
            return true
        case LOADED:
            return false
        case LOADING:
            return false
        default:
            return state
    }
}