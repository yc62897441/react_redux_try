import { CWBHttpRequest } from '../containers/Weather'

// What is the use of middleware Redux thunk ?
// https://www.geeksforgeeks.org/what-is-the-use-of-middleware-redux-thunk/

// 使用到 thunk
// This function includes some async logic, hence we can dispatch action manually
// The addData action creator contains async logic, hence we return a function (thunk function) that calls dispatch when data is fetched from the API. (For this tutorial we are using JSONPlaceholderAPI you can learn more about it here.) Then in the app.js file we add buttons to dispatch the actions and display the fetched data.
export const addData = () => {
    // Thunk Function
    return async (dispatch, getState) => {
        // Fetching results from an API : asynchronous action
        const response = await CWBHttpRequest('get', 'F-B0053-031', 'JSON', '公開資料取得錯誤')

        if (response.status === 200) {
            const data = response.data.cwbopendata.dataset

            // Dispatching the action when async
            // action has completed.
            dispatch({
                type: 'ADD_DATA',
                payload: data,
            })
        } else {
            dispatch({
                type: 'ADD_DATA',
                payload: {
                    datasetInfo: { datasetDescription: '失敗' },
                },
            })
            console.log('error')
        }
    }
}

// 正常的 normal action creator(沒有使用到 thunk)
// This is a synchronous action, hence thunk will not interfere.
export const deleteData = () => {
    return {
        type: 'DELETE_DATA',
    }
}
