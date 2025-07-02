import React, { useState } from 'react';
import { Box, Button, TextField, MenuItem, Alert } from '@mui/material';
import api from '../api';

const difficulties = [
  { value: 'Easy', label: 'Easy' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Hard', label: 'Hard' },
];

const AddQuestionForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('Easy');
  const [tags, setTags] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await api.post('/questions/', { title, description, difficulty, tags });
      setSuccess('Question added!');
      setTitle(''); setDescription(''); setDifficulty('Easy'); setTags('');
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to add question');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2,
          '& .MuiInputLabel-root': {
            color: '#b0b3b8',
            fontWeight: 500,
            zIndex: 2,
            background: '#23272A',
            px: 0.5,
            '&.Mui-focused': {
              color: '#1976d2',
              fontWeight: 700,
              background: '#23272A',
              zIndex: 2,
            },
            '&.Mui-error': {
              color: '#ef4444',
              background: '#23272A',
              zIndex: 2,
            },
          },
        }}
      />
      <TextField
        label="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        fullWidth
        required
        multiline
        minRows={3}
        sx={{ mb: 2,
          '& .MuiInputLabel-root': {
            color: '#b0b3b8',
            fontWeight: 500,
            zIndex: 2,
            background: '#23272A',
            px: 0.5,
            '&.Mui-focused': {
              color: '#1976d2',
              fontWeight: 700,
              background: '#23272A',
              zIndex: 2,
            },
            '&.Mui-error': {
              color: '#ef4444',
              background: '#23272A',
              zIndex: 2,
            },
          },
        }}
      />
      <TextField
        select
        label="Difficulty"
        value={difficulty}
        onChange={e => setDifficulty(e.target.value)}
        fullWidth
        sx={{ mb: 2,
          '& .MuiInputLabel-root': {
            color: '#b0b3b8',
            fontWeight: 500,
            zIndex: 2,
            background: '#23272A',
            px: 0.5,
            '&.Mui-focused': {
              color: '#1976d2',
              fontWeight: 700,
              background: '#23272A',
              zIndex: 2,
            },
            '&.Mui-error': {
              color: '#ef4444',
              background: '#23272A',
              zIndex: 2,
            },
          },
        }}
      >
        {difficulties.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Tags (comma separated)"
        value={tags}
        onChange={e => setTags(e.target.value)}
        fullWidth
        sx={{ mb: 2,
          '& .MuiInputLabel-root': {
            color: '#b0b3b8',
            fontWeight: 500,
            zIndex: 2,
            background: '#23272A',
            px: 0.5,
            '&.Mui-focused': {
              color: '#1976d2',
              fontWeight: 700,
              background: '#23272A',
              zIndex: 2,
            },
            '&.Mui-error': {
              color: '#ef4444',
              background: '#23272A',
              zIndex: 2,
            },
          },
        }}
      />
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <Button type="submit" variant="contained" color="primary" disabled={loading}>
        {loading ? 'Adding...' : 'Add Question'}
      </Button>
    </Box>
  );
};

export default AddQuestionForm; 