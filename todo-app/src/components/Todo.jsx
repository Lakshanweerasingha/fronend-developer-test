import React, { useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText, IconButton, Typography, Box, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Todo = () => {
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

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        width: '100vw',
        bgcolor: '#f0f0f0'  // Match the outer background color with the rest of the app
      }}
    >
      <Box 
        sx={{ 
          width: '100%', 
          maxWidth: '500px', 
          bgcolor: '#ffffff', // Form container background color
          color: '#000', // Text color inside the form container
          p: 3, 
          borderRadius: 1, 
          boxShadow: 3,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Todo List
        </Typography>
        <Box sx={{ display: 'flex', mb: 2 }}>
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
            sx={{ ml: 2 }}
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
                sx={{ textDecoration: todo.done ? 'line-through' : 'none' }} 
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Todo;
