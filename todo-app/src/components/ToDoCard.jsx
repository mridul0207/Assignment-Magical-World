const TodoCard = ({ todo }) => (
    <div className="bg-white shadow rounded p-4 mb-2">
      <h2 className="font-bold">{todo.title}</h2>
      {todo.description && <p>{todo.description}</p>}
      {todo.dueDate && <p className="text-sm text-gray-500">Due: {new Date(todo.dueDate).toLocaleDateString()}</p>}
      <p className="text-xs text-gray-400">Category: {todo.category}</p>
    </div>
  );