import React, { useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText, IconButton, Typography, Box, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../Css/Todo.css';  // Import the CSS file

const Todo = () => {
  const { logout } = useAuth(); // Get the logout function from AuthContext
  const navigate = useNavigate(); // Use navigate for redirection
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const addOrUpdateTodo = () => {
    if (newTodo.trim()) {
      if (editIndex !== null) {
        const updatedTodos = todos.map((todo, index) =>
          index === editIndex ? { ...todo, text: newTodo } : todo
        );
        setTodos(updatedTodos);
        setEditIndex(null);
      } else {
        setTodos([...todos, { text: newTodo, done: false }]);
      }
      setNewTodo('');
    }
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const editTodo = (index) => {
    setNewTodo(todos[index].text);
    setEditIndex(index);
  };

  const toggleDone = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, done: !todo.done } : todo
    );
    setTodos(updatedTodos);
  };

  const handleLogout = () => {
    logout(); // Call the logout function
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <Box className="todo-container">
      <Box className="todo-form-container">
        <Typography variant="h4" gutterBottom>
          Todo List
        </Typography>
        <Box className="input-container">
          <TextField
            fullWidth
            label="New Todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <Button 
            color="primary" 
            variant="contained" 
            onClick={addOrUpdateTodo} 
            className="add-button"
          >
            {editIndex !== null ? 'Update' : 'Add'}
          </Button>
        </Box>
        <List>
          {todos.map((todo, index) => (
            <ListItem 
              key={index} 
              secondaryAction={
                <>
                  <IconButton edge="end" aria-label="edit" onClick={() => editTodo(index)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => deleteTodo(index)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <Checkbox
                checked={todo.done}
                onChange={() => toggleDone(index)}
              />
              <ListItemText 
                primary={todo.text} 
                className={`todo-text ${todo.done ? 'done' : ''}`} 
              />
            </ListItem>
          ))}
        </List>
        {/* Logout Button */}
        <Button
          variant="contained"
          color="secondary"
          onClick={handleLogout}
          className="logout-button"
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Todo;
