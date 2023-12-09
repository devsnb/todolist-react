import { ToastContainer } from 'react-toastify'
import { useTodoValues } from './features/TodoContext'
import TodoContainer from './components/TodoContainer'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'

import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react'

function App() {
	const { fetchTodos, todoState } = useTodoValues()

	useEffect(() => {
		fetchTodos()
	}, [])

	return (
		<>
			<TodoContainer>
				<h1>Todo List</h1>
				<TodoForm />
				{todoState.isLoading && <p>Loading...</p>}
				{!todoState.isLoading && <TodoList />}
				{todoState.error && <p>Failed to get todos</p>}
			</TodoContainer>
			<ToastContainer position='bottom-right' />
		</>
	)
}

export default App
