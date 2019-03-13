import fetch from 'cross-fetch'

export const QUOTE_HISTORY_LOADING = 'QUOTE_HISTORY_LOADING'
export const QUOTE_HISTORY_LOADED_OK = 'QUOTE_HISTORY_LOADED_OK'
export const QUOTE_HISTORY_LOADED_FAIL = 'QUOTE_HISTORY_LOADED_FAIL'

function requestData(period,stockquote) {
    return {
      type: QUOTE_HISTORY_LOADING,
      period,
      stockquote
    }
}
function receiveData(json) {
    return {
      type: QUOTE_HISTORY_LOADED_OK,
      data: json
    }
}
function error(searchString, json) {
    return {
      type: QUOTE_HISTORY_LOADED_FAIL,
      result: json
    }
}
export const search = (period,stockquote) => {
    return dispatch => {
        dispatch(requestData(period,stockquote));
        return fetch(`https://api.iextrading.com/1.0/stock/${stockquote}/chart/${period}`)
            .then(response => {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(json => {
                dispatch(receiveData(json));
            })
            .catch(err => {
                console.error(err);
                dispatch(error(period, stockquote, err))
            });
      }
}
export function onDropdownSelected(period, stockquote) {
    
    return (dispatch, getState) => {
      if (shouldFetch(getState())) {
        return dispatch(search(period, stockquote))
      }
    }
  }

const shouldFetch = (state) => (
    !state.isFetching
)