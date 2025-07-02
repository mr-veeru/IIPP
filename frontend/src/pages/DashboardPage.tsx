import React, { useEffect, useState } from 'react';
import { Typography, Box, List, ListItem, ListItemText, CircularProgress, Alert, Button } from '@mui/material';
import api from '../api';
import AddQuestionForm from '../components/AddQuestionForm';
import SearchQuestion from '../components/SearchQuestion';

const DashboardPage: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAdd, setShowAdd] = useState(false);

  const fetchQuestions = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/questions/');
      setQuestions(res.data);
    } catch (err: any) {
      setError('Failed to load questions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleSearch = async (title: string) => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/questions/search', { params: { q: title } });
      setQuestions(res.data);
    } catch (err: any) {
      setError('Search failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <SearchQuestion onSelect={handleSearch} />
      <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={() => setShowAdd(v => !v)}>
        {showAdd ? 'Hide Add Question' : 'Add Question'}
      </Button>
      {showAdd && <AddQuestionForm onSuccess={fetchQuestions} />}
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <List>
          {questions.map((q) => (
            <ListItem key={q.id} divider>
              <ListItemText
                primary={q.title}
                secondary={`Difficulty: ${q.difficulty}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default DashboardPage; 