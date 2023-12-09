import { createContext, useContext, useReducer } from 'react'
import { toast } from 'react-toastify'

const TodoContext = createContext(null)

export const useTodoValues = () => {
	const { todoState, fetchTodos, addTodo, toggleTodoStatus, removeTodo } =
		useContext(TodoContext)
	return { todoState, fetchTodos, addTodo, toggleTodoStatus, removeTodo }
}

const INITIAL_STATE = {
	todos: [],
	isLoading: false,
	error: null
}

const reducer = (state, action) => {
	switch (action.type) {
		case 'SET_TODOS': {
			return {
				...state,
				todos: action.todos,
				isLoading: false,
				error: false
			}
		}

		case 'SET_LOADING': {
			return {
				...state,
				isLoading: true
			}
		}

		case 'SET_ERROR': {
			toast.error('failed to fetch todos')
			return {
				...state,
				isLoading: false,
				error: action.error
			}
		}

		case 'SAVE_TODO': {
			return {
				...state,
				todos: [{ ...action.todo }, ...state.todos]
			}
		}

		case 'TOGGLE_TODO': {
			const updatedTodos = state.todos.map(todo => {
				if (todo.id === action.todoId) {
					return {
						...todo,
						completed: !todo.completed
					}
				}
				return todo
			})

			return {
				...state,
				todos: updatedTodos
			}
		}

		case 'DELETE_TODO': {
			const updatedTodos = state.todos.filter(todo => todo.id !== action.todoId)
			return {
				...state,
				todos: updatedTodos
			}
		}

		default: {
			return state
		}
	}
}

export const TodoContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

	const setTodos = todos => dispatch({ type: 'SET_TODOS', todos })
	const setLoading = () => dispatch({ type: 'SET_LOADING' })
	const setError = error => dispatch({ type: 'SET_ERROR', error })
	const saveTodo = todo => dispatch({ type: 'SAVE_TODO', todo })
	const toggleTodo = todoId => dispatch({ type: 'TOGGLE_TODO', todoId })
	const deleteTodo = todoId => dispatch({ type: 'DELETE_TODO', todoId })

	const fetchTodos = async () => {
		try {
			setLoading()
			const res = await fetch('https://jsonplaceholder.typicode.com/todos')

			const data = await res.json()

			setTodos(data)
			return data
		} catch (error) {
			console.error(error)
			setError(error)
		}
	}

	const addTodo = async todo => {
		try {
			const res = await fetch('https://jsonplaceholder.typicode.com/todos', {
				method: 'POST',
				body: JSON.stringify(todo),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			if (res.ok && res.status === 201) {
				saveTodo(todo)
				toast.success('Todo added!')
			}
		} catch (error) {
			console.error(first)
			toast.error('could not send todo')
		}
	}

	const toggleTodoStatus = async (todoId, status) => {
		try {
			if (todoId <= 200) {
				const res = await fetch(
					`https://jsonplaceholder.typicode.com/todos/${todoId}`,
					{
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							id: todoId,
							completed: status
						})
					}
				)

				if (res.ok && res.status === 200) {
					toggleTodo(todoId)
					toast.success('updated todo')
				}
			} else {
				toggleTodo(todoId)
				toast.success('updated todo')
			}
		} catch (error) {
			console.log(error)
			toast.error('failed to update todo')
		}
	}

	const removeTodo = async todoId => {
		try {
			const res = await fetch(
				`https://jsonplaceholder.typicode.com/todos/${todoId}`,
				{
					method: 'DELETE'
				}
			)

			if (res.ok && res.status === 200) {
				deleteTodo(todoId)
				toast.success('todo deleted')
			}
		} catch (error) {
			console.log(error)
			toast.error('failed to delete todo')
		}
	}

	return (
		<TodoContext.Provider
			value={{
				todoState: state,
				fetchTodos,
				addTodo,
				toggleTodoStatus,
				removeTodo
			}}
		>
			{children}
		</TodoContext.Provider>
	)
}
