import Header from '../components/Header.jsx'
import { useSelector } from 'react-redux'

const TodoList = () => {
    const todoList = useSelector((state) => state.todoReducer.todoList)
    return <ul>{todoList.length > 0 && todoList.map((item, index) => <li key={item}>{item}</li>)}</ul>
}

function PageA() {
    const state = useSelector((state) => state)
    const todoList = [ ...state.todoReducer.todoList ]

    return (
        <div>
            <Header />
            PageA
            <div>
                <h1>todoList 1</h1>
                <span>代辦事項數：{todoList.length}</span>
                <TodoList />
            </div>
        </div>
    )
}

export default PageA
