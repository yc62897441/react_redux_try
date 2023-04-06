import { CWBHttpRequest } from '../containers/Weather'

// 有一些你到目前為止所看到的一般 action creator。
// 這些 actions 回傳的東西需不需要任何 middleware 就能被 dispatch。
// 不過，他們只能表達「事實」而不是「非同步資料流」。
export const makeDatasetDescriptionAndUpdate = (description, update) => {
    return {
        type: 'MAKE_DatasetDescriptionAndUpdate',
        payload: {
            description,
            update,
        },
    }
}

// 不過當你需要開始一個非同步 action 時你會怎麼做，像是一個 API 呼叫，或是一個 router transition？
// 迎接 thunk。thunk 是一個會回傳一個 function 的 function。這是一個 thunk。
export const makeDatasetDescriptionAndUpdateWithAPI = () => {
    // 反轉控制！
    // 回傳一個接收 `dispatch` 的 function，所以我們可以在之後進行 dispatch。
    // Thunk middleware 知道如何把 thunk async action 轉換成 action。

    return async function (dispatch) {
        try {
            const response = await CWBHttpRequest('get', 'F-B0053-031', 'JSON', '公開資料取得錯誤')

            if (response.status === 200) {
                const description = response.data.cwbopendata.dataset.datasetInfo.datasetDescription
                const update = response.data.cwbopendata.dataset.datasetInfo.update
                dispatch(makeDatasetDescriptionAndUpdate(description, update))
            } else {
                dispatch(makeDatasetDescriptionAndUpdate('失敗', '失敗'))
                console.log('error')
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const makeDatasetDescriptionAndUpdateClear = () => {
    return {
        type: 'MAKE_DatasetDescriptionAndUpdateClear',
    }
}
