import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import api from '../api';

const ExplanationAnalysisPage: React.FC = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await api.post('/explanations/analyze', { text });
      setResult(res.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Explanation Analysis
      </Typography>
      <TextField
        label="Your Explanation"
        value={text}
        onChange={e => setText(e.target.value)}
        fullWidth
        multiline
        minRows={4}
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
      <Button variant="contained" color="primary" onClick={handleAnalyze} disabled={loading || !text}>
        {loading ? 'Analyzing...' : 'Analyze'}
      </Button>
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      {result && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Feedback:</Typography>
          <Alert severity={result.score > 0.7 ? 'success' : 'warning'}>{result.feedback}</Alert>
        </Box>
      )}
    </Box>
  );
};

export default ExplanationAnalysisPage; 