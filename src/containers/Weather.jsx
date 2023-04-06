import axios from 'axios'
import styled from 'styled-components'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// redux actions
import { doFetch } from '../action/weather.js'
import { addData, deleteData } from '../action/weather2.js'
import { makeDatasetDescriptionAndUpdate, makeDatasetDescriptionAndUpdateWithAPI, makeDatasetDescriptionAndUpdateClear } from '../action/weather3.js'

// components
import Header from '../components/Header.jsx'
import LoadingModal from '../components/LoadingModal.jsx'

// 圖檔
import reduxImg from '../asset/img/redux.png'
import reduxwiththunkImg from '../asset/img/reduxwiththunk.png'

const CWBURL = 'https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/'
const CWBAuthorization = '請補上 CWBAuthorization'

export async function CWBHttpRequest(httpMethod, dataCategory, dataType, errorMessage) {
    switch (httpMethod.toLowerCase()) {
        case 'get':
            return await axios.get(`${CWBURL}${dataCategory}?Authorization=${CWBAuthorization}&format=${dataType}`).catch((error) => {
                return { error, errorMessage }
            })
    }
}

const WeatherWrapper = styled.div`
    width: 100%;
`

const SectionWrapper = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
`

const DividingLine = styled.section`
    width: 100%;
    height: 10px;
    background-color: black;
    margin: 20px 0;
`

function Weather() {
    const dispatch = useDispatch()

    // Section 1
    const data = useSelector((state) => state.weatherReducer)
    // console.log('data', data) // 執行順序 1、5 (不考慮 StrictMode)

    // Section 2
    // Selects the state value from the store.
    const dataReducerData = useSelector((state) => state.dataReducer.data)
    // Dispatches action to add the data
    const handleAddData = () => dispatch(addData())
    // Dispatches action to delete the data.
    const handleDeleteData = () => dispatch(deleteData())

    // Section 3
    const weatherReducer3Data = useSelector((state) => state.weatherReducer3)

    useEffect(() => {
        // console.log('useEffect') // 執行順序 3
        async function fetchData() {
            try {
                const response = await CWBHttpRequest('get', 'F-B0053-031', 'JSON', '公開資料取得錯誤')

                if (response.status === 200) {
                    dispatch(doFetch(response.data.cwbopendata.dataset)) // 執行順序 4
                } else {
                    dispatch(doFetch({ datasetInfo: { datasetDescription: '失敗' } }))
                    console.log('error')
                }
            } catch (error) {
                console.log('error', error)
            }
        }

        // Section 1
        fetchData()
    }, [])

    return (
        <WeatherWrapper>
            <Header />

            <SectionWrapper>
                <h1>Section 1</h1>
                <h1>請確認是否有補上 CWBAuthorization</h1>
                {/* // 執行順序 2、6 */}
                {/* {console.log('component data')} */}
                {data?.datasetInfo?.datasetDescription ? data?.datasetInfo?.datasetDescription : <LoadingModal />}
            </SectionWrapper>
            <DividingLine />

            <br />
            <br />
            <br />
            <br />
            <br />

            <SectionWrapper>
                <h1>Section 2</h1>
                <h2>What is the use of middleware Redux thunk ?</h2>
                <h2>
                    <a href="https://www.geeksforgeeks.org/what-is-the-use-of-middleware-redux-thunk/">https://www.geeksforgeeks.org/what-is-the-use-of-middleware-redux-thunk/</a>
                </h2>
                <h3>按「Add Data」取得資料，並透過 thunk 進行 dispatch 非同步處理，將從 API 取得的資料存到 store</h3>
                <h3>按「Delete Data」刪除 store 資料，為 dispatch 同步處理，未使用 thunk</h3>
                <h3>P.S. API 資料取得會慢一點點，按「Add Data」後要等一下下</h3>
                <p>We begin by importing all of the actions & hooks, then use the useDispatch hook to dispatch actions and the useSelector hook to access data in the store. We’ve added two buttons to call the handler functions handleAddData and handleDeleteData, which dispatch their respective actions.</p>
                <p>
                    文字來源： <a href="https://www.geeksforgeeks.org/what-is-the-use-of-middleware-redux-thunk/">https://www.geeksforgeeks.org/what-is-the-use-of-middleware-redux-thunk/</a>
                </p>
                <button onClick={handleAddData}>Add Data</button>
                <button onClick={handleDeleteData}>Delete Data</button>

                <SectionWrapper>
                    <h3>取得之資料如下：</h3>
                    <div style={{ border: '2px solid black', minWidth: '200px', minHeight: '20px' }}>{dataReducerData && <div>{dataReducerData.datasetInfo?.datasetDescription}</div>}</div>
                </SectionWrapper>
                <SectionWrapper>
                    <h3>流程示意</h3>
                    圖片來源：https://www.geeksforgeeks.org/what-is-the-use-of-middleware-redux-thunk/
                    <p>Redux Flow with Thunk: </p>
                    <img src={reduxwiththunkImg} alt="" srcSet="" />
                    <p>Redux flow without thunk: </p>
                    <img src={reduxImg} alt="" srcSet="" />
                </SectionWrapper>
            </SectionWrapper>
            <DividingLine />

            <br />
            <br />
            <br />
            <br />
            <br />

            <SectionWrapper>
                <h1>Section 3</h1>
                <h2>What is the use of middleware Redux thunk ?</h2>
                <h2>
                    <a href="https://chentsulin.github.io/redux/docs/api/applyMiddleware.html">applyMiddleware(...middlewares) - Redux</a>
                </h2>
                <h3>
                    有一些你到目前為止所看到的一般 action creator。
                    <br />
                    這些 actions 回傳的東西需不需要任何 middleware 就能被 dispatch。
                    <br />
                    不過，他們只能表達「事實」而不是「非同步資料流」。
                </h3>
                <h3>
                    不過當你需要開始一個非同步 action 時你會怎麼做，像是一個 API 呼叫，或是一個 router transition？ <br />
                    迎接 thunk。thunk 是一個會回傳一個 function 的 function。這是一個 thunk。 <br />
                    反轉控制！ <br />
                    回傳一個接收 `dispatch` 的 function，所以我們可以在之後進行 dispatch。 <br />
                    Thunk middleware 知道如何把 thunk async action 轉換成 action。 <br />
                </h3>
                <p>
                    文字來源： <a href="https://chentsulin.github.io/redux/docs/api/applyMiddleware.html">https://chentsulin.github.io/redux/docs/api/applyMiddleware.html</a>
                </p>

                <SectionWrapper>
                    <button
                        onClick={() => {
                            dispatch(makeDatasetDescriptionAndUpdate('description without API', Date.now()))
                        }}
                    >
                        makeDatasetDescriptionAndUpdate (dispatch 的資料是在專案內寫死的: 'description without API' 跟 Date.now())
                    </button>
                    <button
                        onClick={() => {
                            dispatch(makeDatasetDescriptionAndUpdateWithAPI('description without API', Date.now()))
                        }}
                    >
                        makeDatasetDescriptionAndUpdateWithAPI (dispatch 的資料是從 API 回傳資料中擷取出來的)
                    </button>
                    <button
                        onClick={() => {
                            dispatch(makeDatasetDescriptionAndUpdateClear())
                        }}
                    >
                        makeDatasetDescriptionAndUpdateClear
                    </button>
                    <h3>取得之資料如下：</h3>
                    <div style={{ border: '2px solid black', minWidth: '200px', minHeight: '20px' }}>
                        {weatherReducer3Data && (
                            <div>
                                {weatherReducer3Data?.description} {weatherReducer3Data?.update}
                            </div>
                        )}
                    </div>
                </SectionWrapper>
            </SectionWrapper>
            <DividingLine />
        </WeatherWrapper>
    )
}

export default Weather
