import React, { useEffect, useState } from 'react';
import { Typography, Box, Card, CardContent, CircularProgress, Alert } from '@mui/material';
import api from '../api';

const RecruiterDashboard: React.FC = () => {
  const [questionAnalytics, setQuestionAnalytics] = useState<any>(null);
  const [candidateAnalytics, setCandidateAnalytics] = useState<any>(null);
  const [questionBank, setQuestionBank] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const [qa, ca, qb] = await Promise.all([
          api.get('/analytics/questions'),
          api.get('/analytics/candidates'),
          api.get('/analytics/question-bank'),
        ]);
        setQuestionAnalytics(qa.data);
        setCandidateAnalytics(ca.data);
        setQuestionBank(qb.data);
      } catch (err: any) {
        setError('Failed to load analytics');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Recruiter Dashboard
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        <Card>
          <CardContent>
            <Typography variant="h6">Question Analytics</Typography>
            <Typography>Total Questions: {questionAnalytics?.total_questions}</Typography>
            <Typography>Easy: {questionAnalytics?.by_difficulty?.Easy}</Typography>
            <Typography>Medium: {questionAnalytics?.by_difficulty?.Medium}</Typography>
            <Typography>Hard: {questionAnalytics?.by_difficulty?.Hard}</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h6">Candidate Analytics</Typography>
            <Typography>Total Candidates: {candidateAnalytics?.total_candidates}</Typography>
            <Typography>Active Candidates: {candidateAnalytics?.active_candidates}</Typography>
            <Typography>Average Score: {candidateAnalytics?.avg_score}%</Typography>
          </CardContent>
        </Card>
        <Card sx={{ gridColumn: { xs: '1', md: '1 / -1' } }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Question Bank</Typography>
            {questionBank.map((q) => (
              <Box key={q.id} sx={{ mb: 1 }}>
                <Typography variant="subtitle1">{q.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Difficulty: {q.difficulty} | Usage: {q.usage_count}
                </Typography>
              </Box>
            ))}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default RecruiterDashboard; 