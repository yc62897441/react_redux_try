import axios from 'axios'
import styled from 'styled-components'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// redux actions
import { doFetch } from '../action/weather.js'
import { addData, deleteData } from '../action/weather2.js'

// components
import Header from '../components/Header.jsx'

// 圖檔
import reduxImg from '../asset/img/redux.png'
import reduxwiththunkImg from '../asset/img/reduxwiththunk.png'

const CWBURL = 'https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/'
const CWBAuthorization = ''

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

const LoadingModalWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    p {
        position: absolute;
        top: 23px;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .lds-roller {
        display: inline-block;
        position: relative;
        width: 80px;
        height: 80px;
    }
    .lds-roller div {
        animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        transform-origin: 40px 40px;
    }
    .lds-roller div:after {
        content: ' ';
        display: block;
        position: absolute;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #999999;
        margin: -4px 0 0 -4px;
    }
    .lds-roller div:nth-child(1) {
        animation-delay: -0.036s;
    }
    .lds-roller div:nth-child(1):after {
        top: 63px;
        left: 63px;
    }
    .lds-roller div:nth-child(2) {
        animation-delay: -0.072s;
    }
    .lds-roller div:nth-child(2):after {
        top: 68px;
        left: 56px;
    }
    .lds-roller div:nth-child(3) {
        animation-delay: -0.108s;
    }
    .lds-roller div:nth-child(3):after {
        top: 71px;
        left: 48px;
    }
    .lds-roller div:nth-child(4) {
        animation-delay: -0.144s;
    }
    .lds-roller div:nth-child(4):after {
        top: 72px;
        left: 40px;
    }
    .lds-roller div:nth-child(5) {
        animation-delay: -0.18s;
    }
    .lds-roller div:nth-child(5):after {
        top: 71px;
        left: 32px;
    }
    .lds-roller div:nth-child(6) {
        animation-delay: -0.216s;
    }
    .lds-roller div:nth-child(6):after {
        top: 68px;
        left: 24px;
    }
    .lds-roller div:nth-child(7) {
        animation-delay: -0.252s;
    }
    .lds-roller div:nth-child(7):after {
        top: 63px;
        left: 17px;
    }
    .lds-roller div:nth-child(8) {
        animation-delay: -0.288s;
    }
    .lds-roller div:nth-child(8):after {
        top: 56px;
        left: 12px;
    }

    @keyframes lds-roller {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`

const SectionWrapper = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
`

function LoadingModal() {
    return (
        <LoadingModalWrapper>
            <div className="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <p>Loading</p>
            </div>
        </LoadingModalWrapper>
    )
}

function Weather() {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.weatherReducer)
    console.log('data', data) // 執行順序 1、5 (不考慮 StrictMode)

    // Selects the state value from the store.
    const dataReducerData = useSelector((state) => state.dataReducer.data)
    // Dispatches action to add the data
    const handleAddData = () => dispatch(addData())
    // Dispatches action to delete the data.
    const handleDeleteData = () => dispatch(deleteData())

    useEffect(() => {
        // console.log('useEffect') // 執行順序 3
        async function fetchData() {
            try {
                const response = await CWBHttpRequest('get', 'F-B0053-031', 'JSON', '公開資料取得錯誤')
                dispatch(doFetch(response.data.cwbopendata.dataset)) // 執行順序 4
            } catch (error) {
                console.log('error', error)
            }
        }

        fetchData()
    }, [])

    return (
        <WeatherWrapper>
            <Header />
            <h1>請確認是否有補上 CWBAuthorization</h1>
            {/* // 執行順序 2、6 */}
            {/* {console.log('component data')} */}
            {data?.datasetInfo?.datasetDescription ? data?.datasetInfo?.datasetDescription : <LoadingModal />}

            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            <h2>What is the use of middleware Redux thunk ?</h2>
            <h2>
                <a href="https://www.geeksforgeeks.org/what-is-the-use-of-middleware-redux-thunk/">https://www.geeksforgeeks.org/what-is-the-use-of-middleware-redux-thunk/</a>
            </h2>
            <h3>按「Add Data」取得資料，並透過 thunk 進行 dispatch 非同步處理，將從 API 取得的資料存到 store</h3>
            <h3>按「Delete Data」刪除 store 資料，為 dispatch 同步處理，未使用 thunk</h3>
            <h3>P.S. API 資料取得會慢一點點，按「Add Data」後要等一下下</h3>
            <p>We begin by importing all of the actions & hooks, then use the useDispatch hook to dispatch actions and the useSelector hook to access data in the store. We’ve added two buttons to call the handler functions handleAddData and handleDeleteData, which dispatch their respective actions.</p>
            <p>文字來源：https://www.geeksforgeeks.org/what-is-the-use-of-middleware-redux-thunk/</p>
            <button onClick={handleAddData}>Add Data</button>
            <button onClick={handleDeleteData}>Delete Data</button>

            <SectionWrapper>
                <h3>取得之資料如下：</h3>
                <div style={{ border: '2px solid black', minWidth: '200px', minHeight: '20px' }}>{dataReducerData && <div>{dataReducerData.datasetInfo.datasetDescription}</div>}</div>
            </SectionWrapper>
            <SectionWrapper>
                <h3>流程示意</h3>
                圖片來源：https://www.geeksforgeeks.org/what-is-the-use-of-middleware-redux-thunk/
                <p>Redux Flow with Thunk: </p>
                <img src={reduxwiththunkImg} alt="" srcset="" />
                <p>Redux flow without thunk: </p>
                <img src={reduxImg} alt="" srcset="" />
            </SectionWrapper>
        </WeatherWrapper>
    )
}

export default Weather
