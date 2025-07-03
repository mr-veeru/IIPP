import React, { useEffect, useState } from 'react';
import { Typography, Box, List, ListItem, ListItemText, CircularProgress, Alert } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { getRecommendations } from '../api';

const RecommendationsPage: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { userId } = useAuth();

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      setError('');
      try {
        if (userId) {
          const res = await getRecommendations(Number(userId));
          setQuestions(res.data);
        } else {
          setQuestions([]);
        }
      } catch (err: any) {
        setError('Failed to load recommendations');
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendations();
  }, [userId]);

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