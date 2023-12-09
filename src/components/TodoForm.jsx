import { useState } from 'react'
import { useTodoValues } from '../features/TodoContext'
import './TodoForm.css'

const TodoForm = () => {
	const { addTodo } = useTodoValues()
	const [todoTitle, setTodoTitle] = useState('')

	const todoAddHandler = e => {
		e.preventDefault()

		const todo = {
			id: Math.floor(Math.random() * 10000) + 1,
			userId: 1,
			title: todoTitle,
			completed: false
		}

		addTodo(todo)
	}

	return (
		<div className='form-container'>
			<form className='form' onSubmit={todoAddHandler}>
				<input
					type='text'
					id='todo'
					name='todo'
					placeholder='Todo...'
					value={todoTitle}
					onChange={e => setTodoTitle(e.target.value)}
				/>

				<button type='submit'>Add Todo</button>
			</form>
		</div>
	)
}

export default TodoForm
