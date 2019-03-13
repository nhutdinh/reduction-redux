import fetch from 'cross-fetch'

export const SUBMIT = 'SUBMIT'
export const LOADING = 'LOADING'
export const LOADED_OK = 'LOADED_OK'
export const LOADED_FAIL = 'LOADED_FAIL'
export const QUOTE_LOADED_OK = 'QUOTE_LOADED_OK'

function requestPosts(searchString) {
    return {
      type: LOADING,
      searchString
    }
}
function receivePosts(searchString, json) {
    return {
      type: LOADED_OK,
      searchString,
      quotes: json.map(it=>{
          return {
              isLoading: true,
              data: {
                symbol: it
              }
          }
      })
    }
}
function receiveQuoteDetailData(stockquote, quote) {
    return {
        type: QUOTE_LOADED_OK,
        quote: quote
    }
}
function error(searchString, json) {
    return {
      type: LOADED_FAIL,
      searchString,
      result: json
    }
}
export const search = searchString => {
    return dispatch => {
        dispatch(requestPosts(searchString));
        return fetch(`https://api.iextrading.com/1.0/stock/${searchString}/peers`)
            .then(response => {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(json => {
                dispatch(receivePosts(searchString, json));
                json.every(stockquote=>{
                    fetch(`https://api.iextrading.com/1.0/stock/${stockquote}/company`)
                    .then(res=>{
                        if (res.status >= 400) {
                            throw new Error("Bad response from server");
                        }
                        return res.json();
                    })
                    .then(data => {
                        dispatch(receiveQuoteDetailData(stockquote, data));
                    })
                })

            })
            .catch(err => {
                console.error(err);
                dispatch(error(searchString, err))
            });
      }
}
export function searchIfNeeded(searchString) {
    
    return (dispatch, getState) => {
      if (shouldFetch(getState(), searchString)) {
        return dispatch(search(searchString))
      }
    }
  }
export const loadMore = searchString => (dispatch, getState) => {
    search(searchString);
}

function getCardInfo(stockquote){
    
}

const searchDone = (searchString, result) => {
    console.log('RECEIVED');
    return {
        type: LOADED_OK,
        searchString,
        result
    }
}

const shouldFetch = (state, searchString) => (
    !state.isFetching
)