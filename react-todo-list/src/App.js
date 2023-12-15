import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      const data = await response.json();
      setTodos(data.slice(0, 5));
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      // Make a DELETE request to the server
      await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE',
      });
      // Update the local state after successful deletion
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleAdd = async () => {
    try {
      // Make a POST request to the server to add a new todo
      const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newTodo,
          completed: false,
        }),
      });
      const data = await response.json();
      // Update the local state after successful addition
      setTodos((prevTodos) => [...prevTodos, data]);
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter a new todo"
      />
      <button onClick={handleAdd}>Add Todo</button>
      <TodoList todos={todos} onDelete={handleDelete} />
    </div>
  );
};

export default App;