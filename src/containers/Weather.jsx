import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { doFetch } from '../action/weather.js'
import axios from 'axios'
import styled from 'styled-components'
import Header from '../components/Header.jsx'

const CWBURL = 'https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/'
const CWBAuthorization = '...'

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

function Weather() {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.weatherReducer)
    console.log('data', data) // 執行順序 1、5 (不考慮 StrictMode)

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
            {data?.datasetInfo?.datasetDescription}
        </WeatherWrapper>
    )
}

export default Weather
