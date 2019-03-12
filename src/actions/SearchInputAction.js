// import fetch from 'cross-fetch'

export const SUBMIT = 'SUBMIT'
export const LOADING = 'LOADING'
export const LOADED = 'LOADED'


export const search = () => {
    alert(2323);
    // if (shouldFetch(getState(), searchString)) {
    //     return fetch("https://api.iextrading.com/1.0/stock/{searchString}/peers", {method: 'GET'})
    //         .then(response => response.json())
    //         .then(json => dispatch(searchDone(searchString, json)))
            
    // }
}
export const loadMore = searchString => (dispatch, getState) => {
    search(searchString);
}

const searchDone = (searchString, result) => {
    console.log('RECEIVED');
    return {
        type: LOADED,
        searchString,
        result
    }
}

const shouldFetch = (state, searchString) => (
    !state.isFetching
)