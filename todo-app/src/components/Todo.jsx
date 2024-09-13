import React, { useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText, IconButton, Container, Typography, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, newTodo]);
      setNewTodo('');
    }
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <Container 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        width: '100vw' 
      }}
    >
      <Box 
        sx={{ 
          width: '100%', 
          maxWidth: '500px', 
          bgcolor: 'background.paper', 
          p: 3, 
          borderRadius: 1, 
          boxShadow: 3 
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
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
            onClick={addTodo} 
            sx={{ ml: 2 }}
          >
            Add
          </Button>
        </Box>
        <List>
          {todos.map((todo, index) => (
            <ListItem 
              key={index} 
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => deleteTodo(index)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={todo} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default Todo;
