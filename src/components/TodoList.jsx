import { useTodoValues } from '../features/TodoContext'

import TodoItem from './TodoItem'
import './TodoList.css'

const TodoList = () => {
	const { todoState } = useTodoValues()
	return (
		<div className='todo-list'>
			{todoState.todos.map(todo => (
				<TodoItem todo={todo} key={todo.id} />
			))}
		</div>
	)
}

export default TodoList
