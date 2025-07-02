import React, { useEffect, useState } from 'react';
import { Typography, Box, List, ListItem, ListItemText, CircularProgress, Alert } from '@mui/material';
import api from '../api';

const RecommendationsPage: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await api.get('/recommendations/');
        setQuestions(res.data);
      } catch (err: any) {
        setError('Failed to load recommendations');
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendations();
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Recommended Questions
      </Typography>
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

export default RecommendationsPage; 