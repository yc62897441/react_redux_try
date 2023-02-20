import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addTodo } from '../action/todolist'
import { addTodo2 } from '../action/todolist2'
import Header from '../components/Header.jsx'

const TodoList = () => {
    const todoList = useSelector((state) => state.todoReducer.todoList)
    return <ul>{todoList.length > 0 && todoList.map((item, index) => <li key={item}>{item}</li>)}</ul>
}

const TodoList2 = () => {
    const todoList = useSelector((state) => state.todoReducer2.todoList)
    return <ul>{todoList.length > 0 && todoList.map((item, index) => <li key={item}>{item}</li>)}</ul>
}

function HomePage() {
    const [newTodo, setNewTodo] = useState('')
    const [newTodo2, setNewTodo2] = useState('')

    // dispatch 傳到的內容是每個 reducer(/reducer/todolist.js、/reducer/todolist2.js) 都會接收到的，所以這兩個 reducer 的 switch (action.type) 的 case 是相同的，則都會執行兩個 case 的內容
    const dispatch = useDispatch()

    const state = useSelector((state) => state)
    const todoList = [...state.todoReducer.todoList]
    const todoList2 = [...state.todoReducer2.todoList]

    function handleInputChange(value) {
        setNewTodo(value)
    }

    function handleSubmit() {
        dispatch(addTodo(newTodo))
        setNewTodo('')
    }

    function handleInputChange2(value) {
        setNewTodo2(value)
    }

    function handleSubmit2() {
        dispatch(addTodo2(newTodo2))
        setNewTodo2('')
    }

    return (
        <div>
            <Header />
            HomePage
            <div>
                <p>dispatch 傳的內容是每個 reducer(/reducer/todolist.js、/reducer/todolist2.js) 都會接收到的，如果兩個 reducer 的 switch (action.type) 中有相同的 case，則都會執行兩個 case 的內容。</p>
                <p>下面兩個 todo list reducer 都有 case: ADD_TODO，所以當 dispatch 傳入的 action.type 是 ADD_TODO，則都會基於執行相同的 payload 做為執行內容。</p>
                <p>/action/todolist.js addTodo() 的 payload 是原始傳入的內容，/action/todolist2.js addTodo2() 的 payload 有再做另外處理，所以同樣是 action.type 是 ADD_TODO，但如果傳到 dispatch 是 addTodo() 或是 addTodo2() 則將有不同的結果。</p>
                <p>嘗試在兩個 input 輸入內容：</p>
            </div>
            <div>
                <h1>todoList 1</h1>
                <span>代辦事項數：{todoList.length}</span>
                <div>
                    <input
                        value={newTodo}
                        onChange={(e) => {
                            handleInputChange(e.target.value)
                        }}
                    />
                    <button type="button" onClick={handleSubmit}>
                        新增事項
                    </button>
                </div>
                <TodoList />
            </div>
            <div>
                <h1>todoList 2</h1>
                <span>代辦事項數：{todoList2.length}</span>
                <div>
                    <input
                        value={newTodo2}
                        onChange={(e) => {
                            handleInputChange2(e.target.value)
                        }}
                    />
                    <button type="button" onClick={handleSubmit2}>
                        新增事項
                    </button>
                </div>
                <TodoList2 />
            </div>
        </div>
    )
}

export default HomePage
