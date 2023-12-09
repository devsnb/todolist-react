import { useTodoValues } from '../features/TodoContext'
import './TodoItem.css'

const TodoItem = ({ todo }) => {
	const { toggleTodoStatus, removeTodo } = useTodoValues()

	const onTodoUpdate = () => {
		toggleTodoStatus(todo.id, todo.completed)
	}

	return (
		<div className='todo-item'>
			<div className='check-todo'>
				<input
					className='check'
					type='checkbox'
					checked={todo.completed}
					id={todo.id}
					onClick={onTodoUpdate}
					onChange={() => {}}
				/>
				<label htmlFor={todo.id}>{todo.title}</label>
			</div>
			<button type='button' onClick={() => removeTodo(todo.id)}>
				Remove
			</button>
		</div>
	)
}

export default TodoItem
