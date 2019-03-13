import fetch from 'cross-fetch'

export const SEARCH_LOADING = 'SEARCH_LOADING'
export const SEARCH_LOADED_OK = 'SEARCH_LOADED_OK'
export const SEARCH_LOADED_FAIL = 'SEARCH_LOADED_FAIL'
export const QUOTE_DETAIL_LOADED_OK = 'QUOTE_DETAIL_LOADED_OK'

function requestData(searchString) {
    return {
      type: SEARCH_LOADING,
      searchString
    }
}
function receiveData(searchString, json) {
    return {
      type: SEARCH_LOADED_OK,
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
    console.log(quote);
    return {
        type: QUOTE_DETAIL_LOADED_OK,
        quote: quote
    }
}
function error(searchString, json) {
    return {
      type: SEARCH_LOADED_FAIL,
      searchString,
      result: json
    }
}
export const search = searchString => {
    return dispatch => {
        dispatch(requestData(searchString));
        return fetch(`https://api.iextrading.com/1.0/stock/${searchString}/peers`)
            .then(response => {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(json => {
                dispatch(receiveData(searchString, json));
                json.forEach(stockquote=>{
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

const shouldFetch = (state) => (
    !state.search.isFetching
)