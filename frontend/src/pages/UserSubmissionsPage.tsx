import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Alert, List, ListItem, ListItemText, Paper, IconButton, Button } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { getUserSubmissions, deleteUserSubmissions, deleteSubmission } from '../api';
import api from '../api';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

interface Submission {
  id: number;
  question_id: number;
  status: string;
  timestamp: string;
  question?: { title: string };
}

const UserSubmissionsPage: React.FC = () => {
  const { userId } = useAuth();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubmissions = async () => {
      setLoading(true);
      setError('');
      try {
        if (userId) {
          const res = await getUserSubmissions(Number(userId));
          // Only show solved submissions
          const solvedSubs = res.data.filter((sub: Submission) => sub.status === 'solved');
          // Fetch question titles for each submission
          const submissionsWithTitles = await Promise.all(solvedSubs.map(async (sub: Submission) => {
            try {
              const qRes = await api.get(`/questions/${sub.question_id}`);
              return { ...sub, question: { title: qRes.data.title } };
            } catch {
              return { ...sub, question: { title: 'Unknown' } };
            }
          }));
          setSubmissions(submissionsWithTitles);
        } else {
          setSubmissions([]);
        }
      } catch (err: any) {
        setError('Failed to load submissions');
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, [userId]);

  const handleDelete = async (id: number) => {
    await deleteSubmission(id);
    setSubmissions(submissions.filter(s => s.id !== id));
  };

  const handleClearAll = async () => {
    if (userId) {
      await deleteUserSubmissions(Number(userId));
      setSubmissions([]);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
          mt: 2,
          px: { xs: 1, md: 4 },
          gap: 2,
          flexWrap: { xs: 'wrap', md: 'nowrap' },
        }}
      >
        <Typography variant="h4" gutterBottom>
          My Submissions
        </Typography>
        <Button
          variant="outlined"
          color="error"
          onClick={handleClearAll}
          disabled={!submissions.length}
          sx={{ minWidth: 180 }}
        >
          Clear All Submissions
        </Button>
      </Box>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}><CircularProgress /></Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <List sx={{ width: '100%', maxWidth: 900, mx: 'auto', mt: 2 }}>
          {submissions.map((sub) => (
            <Paper
              key={sub.id}
              sx={{
                mb: 3,
                p: 3,
                background: '#23272A',
                borderRadius: 3,
                boxShadow: '0 2px 12px #181A1B',
              }}
              elevation={4}
            >
              <ListItem
                divider={false}
                disableGutters
                sx={{ px: 2, py: 2 }}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(sub.id)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={
                    <Typography variant="h6" sx={{ color: '#fff' }}>
                      {sub.question?.title || 'Unknown Question'}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" sx={{ color: '#b0b3b8' }}>
                      {(() => {
                        try {
                          const utcDate = parseISO(sub.timestamp);
                          const istDate = toZonedTime(utcDate, 'Asia/Kolkata');
                          const timeAgo = formatDistanceToNow(istDate, { addSuffix: true });
                          if (timeAgo.includes('less than a minute')) {
                            return 'Submitted just now';
                          }
                          return `Submitted ${timeAgo}`;
                        } catch {
                          return 'Submitted just now';
                        }
                      })()}
                    </Typography>
                  }
                />
              </ListItem>
            </Paper>
          ))}
        </List>
      )}
    </Box>
  );
};

export default UserSubmissionsPage; 