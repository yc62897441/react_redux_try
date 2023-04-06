import { configureStore } from '@reduxjs/toolkit'
import { combineReducers, createStore, compose } from 'redux'

// 各個 reducer
import todoReducer from '../reducer/todolist'
import todoReducer2 from '../reducer/todolist2'
import weatherReducer from '../reducer/weather'
import { dataReducer } from '../reducer/weather2'
import { weatherReducer3 } from '../reducer/weather3'

// redux enhancer
import { applyMiddleware } from 'redux-subspace'
import thunk from 'redux-thunk'
import dynostore, { dynamicReducers } from '@redux-dynostore/core'

const rootReducer = combineReducers({
    todoReducer,
    todoReducer2,
    weatherReducer,
    dataReducer,
    weatherReducer3,
})

const store = createStore(rootReducer, compose(applyMiddleware(thunk), dynostore(dynamicReducers())))

export default store

// chatGTP
// const store = createStore(
//   rootReducer,
//   compose(applyMiddleware(thunk), dynostore(dynamicReducers()))
// );
// 這段程式碼的功能是建立一個Redux store，用於管理React應用程式中的狀態。Redux是一個用於JavaScript應用程式的狀態管理庫，可以將應用程式中的所有狀態集中管理，使得應用程式的狀態變得可預測和易於測試。
// createStore是Redux提供的一個函數，用於建立一個Redux store。這個函數接受兩個參數：rootReducer和enhancer。rootReducer是一個純函數，用於定義應用程式中所有狀態的初始值和更新邏輯。enhancer是一個函數，用於對Redux store進行增強。
// 在這段程式碼中，compose是一個Redux提供的函數，用於將多個增強函數合併成一個函數。applyMiddleware和dynostore是兩個Redux的增強函數。applyMiddleware用於引入Redux中間件，thunk是其中一個常用的中間件，用於處理異步操作。dynostore是一個自定義的增強函數，用於動態加載Redux reducers。
// 總之，這段程式碼的功用是建立一個Redux store，並對其進行增強，使其支持中間件和動態加載reducers的功能。
// 當建立Redux store時，enhancer是一個函數，用於對store進行增強，以擴展store的功能。常見的增強函數包括中間件、持久化存儲、熱重載等等。通過增強函數，可以在Redux應用程式中實現更多的功能和特性，以提高開發效率和用戶體驗。
// 其中，thunk是一種Redux中間件，它的功能是允許在Redux中執行異步操作。在Redux中，一般情況下只能同步更新狀態，無法處理異步操作。而使用thunk中間件，可以讓Redux支持異步操作，使得開發者能夠更靈活地處理非同步的業務邏輯，如發送網絡請求、訪問本地存儲等等。
// dynostore是一個自定義的Redux增強函數，它的功能是實現動態加載reducers。在大型的Redux應用程式中，可能會有大量的reducers，而一次性加載所有的reducers會導致應用程式啟動速度緩慢，佔用過多的內存。使用dynostore增強函數，可以實現按需加載reducers，從而提高應用程式的啟動速度和性能。
// 總之，Redux中的enhancer、thunk和dynostore都是用於擴展Redux store的功能和特性，以提高Redux應用程式的開發效率和用戶體驗。其中，thunk用於處理異步操作，dynostore用於動態加載reducers，而enhancer則是一個通用的擴展點，可以實現各種不同的擴展。

// https://chentsulin.github.io/redux/docs/Glossary.html#store-enhancer
// Store enhancer
// store enhancer 是個 higher-order function，它組合 store creator 以回傳一個新的、強化的 store creator。這與 middleware 類似，它也讓你可以用組合的方式改變 store 的介面。
// Store enhancers 跟 React 的 higher-order component 是大致相同的概念，後者偶爾也被稱為「component enhancer」。
// 因為 store 不是個物件實體，而只是一個 function 的 collection，它的複製品可以簡單地被建立和調整而不會改變到原來的 store。在 compose 文件中有一個範例展示了這個。
// 你很有可能永遠也不會寫到 store enhancer，但是你可能已經使用了一個由開發工具所提供的。這就是使 time travel 可以實現，但應用程式卻沒有意識到他發生的東西。有趣的是，Redux middleware 的實作本身就是一個 store enhancer。
