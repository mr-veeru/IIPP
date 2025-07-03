import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Alert, 
  Paper,
  IconButton,
  Tooltip,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import SettingsIcon from '@mui/icons-material/Settings';
import api from '../api';
import { useAuth } from '../contexts/AuthContext';
import { recordSubmission, getQuestions, getUserSubmissions } from '../api';
import Modal from '@mui/material/Modal';
import LinearProgress from '@mui/material/LinearProgress';
import MonacoEditor from '@monaco-editor/react';
import Snackbar from '@mui/material/Snackbar';

const defaultCode = `# Welcome to IIPP Code Playground!
# Write your Python code here

def fibonacci(n):
    """Calculate the nth Fibonacci number"""
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Example usage
print("Fibonacci sequence:")
for i in range(10):
    result = fibonacci(i)
    print(f"F({i}) = {result}")

# Try your own code below
name = input("Enter your name: ")
print(f"Hello, {name}! Welcome to IIPP!")`;

const CodePlayground: React.FC = () => {
  const [code, setCode] = useState(defaultCode);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { userId } = useAuth();
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const [search, setSearch] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [userSolvedIds, setUserSolvedIds] = useState<number[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  React.useEffect(() => {
    async function fetchData() {
      const [questionsRes, submissionsRes] = await Promise.all([
        getQuestions(),
        userId ? getUserSubmissions(Number(userId)) : Promise.resolve({ data: [] })
      ]);
      setQuestions(questionsRes.data);
      const solvedIds = submissionsRes.data
        .filter((s: any) => s.status === 'solved')
        .map((s: any) => s.question_id);
      setUserSolvedIds(solvedIds);
      // Default to first unsolved Easy question
      const firstUnsolved = questionsRes.data.find(
        (q: any) => q.difficulty === 'Easy' && !solvedIds.includes(q.id)
      ) || questionsRes.data[0];
      setCurrentQuestion(firstUnsolved);
    }
    fetchData();
  }, [userId]);

  // Progress calculation
  const solvedCount = questions.filter(q => userSolvedIds.includes(q.id)).length;
  const totalCount = questions.length;
  const progress = totalCount ? Math.round((solvedCount / totalCount) * 100) : 0;

  // Filtered questions for selector
  const filteredQuestions = questions.filter(q =>
    (difficultyFilter ? q.difficulty === difficultyFilter : true) &&
    (search ? q.title.toLowerCase().includes(search.toLowerCase()) : true)
  );

  // Update current question if search/filter changes
  React.useEffect(() => {
    if (filteredQuestions.length && (!currentQuestion || !filteredQuestions.some(q => q.id === currentQuestion.id))) {
      setCurrentQuestion(filteredQuestions[0]);
      setCode(defaultCode);
    }
    // If no match, clear current question
    if (!filteredQuestions.length) {
      setCurrentQuestion(null);
      setCode(defaultCode);
    }
    // eslint-disable-next-line
  }, [search, difficultyFilter, questions]);

  const handleRun = async () => {
    setLoading(true);
    setError('');
    setOutput('');
    try {
      const res = await api.post('/submissions/execute', {
        code,
        language: 'python',
        input,
      });
      if (res.data.stderr) {
        setError(res.data.stderr);
      }
      setOutput(res.data.stdout);
      // No more recording 'attempted' submissions here
    } catch (err: any) {
      setError(err.response?.data?.error || 'Execution failed');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
  };

  const handleDownloadCode = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'code.py';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSubmit = async () => {
    if (userId && currentQuestion) {
      await recordSubmission(Number(userId), currentQuestion.id, 'solved');
      setSnackbarOpen(true);
      // Move to next unsolved question (Easy → Medium → Hard)
      const difficulties = ['Easy', 'Medium', 'Hard'];
      const currentIdx = difficulties.indexOf(currentQuestion.difficulty);
      let next = null;
      for (let i = currentIdx; i < difficulties.length; i++) {
        next = questions.find(
          q => q.difficulty === difficulties[i] && !userSolvedIds.includes(q.id) && q.id !== currentQuestion.id
        );
        if (next) break;
      }
      if (next) {
        setCurrentQuestion(next);
        setCode(defaultCode);
        setUserSolvedIds([...userSolvedIds, currentQuestion.id]);
      } else {
        alert('Congratulations! You have solved all questions.');
      }
    }
  };

  const lineCount = code.split('\n').length;

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #181A1B 0%, #23272A 100%)', p: 0 }}>
      {/* Header */}
      <Box sx={{ 
        p: 2, 
        background: 'linear-gradient(135deg, #23272A 0%, #181A1B 100%)',
        borderBottom: '1px solid #23272A',
        boxShadow: '0 2px 8px rgba(25, 118, 210, 0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h5" sx={{ color: '#fff', fontWeight: 700, letterSpacing: '-1px' }}>
              <Box component="span" sx={{ color: '#569cd6' }}>IIPP</Box> Code Playground
            </Typography>
            <Chip 
              label="Python" 
              size="small" 
              sx={{ 
                background: '#007acc',
                color: 'white',
                fontWeight: 600
              }} 
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="Copy Code">
              <IconButton onClick={handleCopyCode} sx={{ color: 'white', transition: '0.2s', '&:hover': { color: '#64b5f6' } }}>
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Download Code">
              <IconButton onClick={handleDownloadCode} sx={{ color: 'white', transition: '0.2s', '&:hover': { color: '#64b5f6' } }}>
                <DownloadIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Settings">
              <IconButton sx={{ color: 'white', transition: '0.2s', '&:hover': { color: '#64b5f6' } }} onClick={() => setSettingsOpen(true)}>
                <SettingsIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>

      {/* Progress Bar */}
      <Box sx={{ px: 2, pt: 2, pb: 0 }}>
        <Paper elevation={3} sx={{ background: '#23272A', borderRadius: 2, p: 2, mb: 2 }}>
          <Typography variant="subtitle2" sx={{ color: '#b0b3b8', mb: 1 }}>
            Progress: {solvedCount} / {totalCount} solved
          </Typography>
          <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 4, background: '#181A1B', '& .MuiLinearProgress-bar': { background: '#1976d2' } }} />
        </Paper>
      </Box>

      {/* Search and Filter */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2, px: 2 }}>
        <TextField
          label="Search Questions"
          value={search}
          onChange={e => setSearch(e.target.value)}
          size="small"
          sx={{ background: '#23272A', input: { color: '#fff' }, borderRadius: 2, boxShadow: '0 1px 4px #181A1B' }}
          InputLabelProps={{ style: { color: '#b0b3b8' } }}
        />
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel id="difficulty-filter-label" sx={{ color: '#b0b3b8' }}>Difficulty</InputLabel>
          <Select
            labelId="difficulty-filter-label"
            value={difficultyFilter}
            label="Difficulty"
            onChange={e => setDifficultyFilter(e.target.value)}
            sx={{ color: '#fff', background: '#23272A', borderRadius: 2 }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Easy">Easy</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Hard">Hard</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Question Selector */}
      <Box sx={{ p: 2, background: '#23272A', borderBottom: '1px solid #3e3e42', boxShadow: '0 2px 8px #181A1B' }}>
        <FormControl sx={{ minWidth: 240, mb: 2 }}>
          <InputLabel id="question-select-label" sx={{ color: '#b0b3b8' }}>Select Question</InputLabel>
          <Select
            labelId="question-select-label"
            value={currentQuestion?.id || ''}
            label="Select Question"
            onChange={e => {
              const q = filteredQuestions.find(q => q.id === e.target.value);
              setCurrentQuestion(q);
              setCode(defaultCode); // Optionally reset code to default
            }}
            sx={{ color: '#fff', background: '#181A1B', borderRadius: 2 }}
            MenuProps={{ PaperProps: { sx: { background: '#23272A', color: '#fff' } } }}
          >
            {filteredQuestions.map(q => (
              <MenuItem key={q.id} value={q.id} sx={{ display: 'flex', alignItems: 'center', gap: 1, '&:hover': { background: '#1976d2', color: '#fff' } }}>
                {q.title} <span style={{ color: '#888', fontSize: 12, marginLeft: 8 }}>({q.difficulty})</span>
                {userSolvedIds.includes(q.id) && <Chip label="Solved" color="success" size="small" sx={{ ml: 1, fontWeight: 600 }} />}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {currentQuestion && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h6" sx={{ color: '#fff' }}>{currentQuestion.title}</Typography>
            <Chip
              label={currentQuestion.difficulty}
              color={
                currentQuestion.difficulty === 'Easy'
                  ? 'success'
                  : currentQuestion.difficulty === 'Medium'
                  ? 'warning'
                  : 'error'
              }
              size="small"
              sx={{ fontWeight: 600 }}
            />
          </Box>
        )}
        {currentQuestion && (
          <Typography variant="body2" sx={{ color: '#b0b3b8' }}>{currentQuestion.description}</Typography>
        )}
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Code Editor */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Editor Header */}
          <Box sx={{ 
            p: 1, 
            background: '#2d2d30', 
            borderBottom: '1px solid #3e3e42',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}>
            <Box sx={{ 
              width: 12, 
              height: 12, 
              borderRadius: '50%', 
              background: '#ff5f56',
              border: '1px solid #e0443e'
            }} />
            <Box sx={{ 
              width: 12, 
              height: 12, 
              borderRadius: '50%', 
              background: '#ffbd2e',
              border: '1px solid #dea123'
            }} />
            <Box sx={{ 
              width: 12, 
              height: 12, 
              borderRadius: '50%', 
              background: '#27ca3f',
              border: '1px solid #1aab29'
            }} />
            <Typography variant="caption" sx={{ color: '#858585', ml: 2 }}>
              {lineCount} lines
            </Typography>
          </Box>

          {/* Code Area with Monaco editor */}
          <Box sx={{ 
            flex: 1, 
            background: '#1e1e1e',
            overflow: 'auto',
            position: 'relative',
            p: 2,
            borderRadius: 2,
            boxShadow: '0 2px 8px #181A1B',
            mb: 2
          }}>
            <MonacoEditor
              height="400px"
              language="python"
              value={code}
              onChange={value => setCode(value || '')}
              theme="vs-dark"
              options={{
                fontSize: fontSize,
                minimap: { enabled: false },
                automaticLayout: true,
                wordWrap: 'on',
                scrollBeyondLastLine: false,
                autoClosingBrackets: 'always',
                autoClosingQuotes: 'always',
                suggestOnTriggerCharacters: true,
                tabSize: 4,
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 2, p: 2, background: '#23272A', borderTop: '1px solid #3e3e42' }}>
            <Button variant="contained" color="primary" onClick={handleRun} startIcon={<PlayArrowIcon />} disabled={loading}>
              {loading ? 'Running...' : 'Run Code'}
            </Button>
            <Button variant="outlined" color="success" onClick={handleSubmit} disabled={!userId || !currentQuestion}>
              Submit Solution
            </Button>
          </Box>
        </Box>

        {/* Sidebar */}
        <Box sx={{ width: 400, background: '#252526', borderLeft: '1px solid #3e3e42' }}>
          {/* Input Section */}
          <Box sx={{ p: 2, borderBottom: '1px solid #3e3e42' }}>
            <Typography variant="subtitle2" sx={{ color: 'white', mb: 1 }}>
              Input (stdin)
            </Typography>
            <TextField
              value={input}
              onChange={e => setInput(e.target.value)}
              multiline
              minRows={3}
              maxRows={6}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  background: '#1e1e1e',
                  color: 'white',
                  '& fieldset': {
                    borderColor: '#3e3e42',
                  },
                  '&:hover fieldset': {
                    borderColor: '#007acc',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#007acc',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#858585',
                },
              }}
            />
          </Box>

          {/* Output Section */}
          <Box sx={{ flex: 1, p: 2, overflow: 'auto' }}>
            <Typography variant="subtitle2" sx={{ color: 'white', mb: 1 }}>
              Output
            </Typography>
            
            {error && (
              <Alert severity="error" sx={{ mb: 2, background: '#2d2d30', color: '#f48771' }}>
                {error}
              </Alert>
            )}
            
            {output && (
              <Paper sx={{ 
                background: '#1e1e1e', 
                color: '#d4d4d4',
                p: 2, 
                borderRadius: 1,
                fontFamily: 'Consolas, Monaco, monospace',
                fontSize: '14px',
                whiteSpace: 'pre-wrap',
                border: '1px solid #3e3e42'
              }}>
                {output}
              </Paper>
            )}
            
            {!output && !error && (
              <Box sx={{ 
                color: '#858585', 
                fontStyle: 'italic',
                textAlign: 'center',
                py: 4
              }}>
                Run your code to see the output here
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      {/* Settings Modal */}
      <Modal open={settingsOpen} onClose={() => setSettingsOpen(false)}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: '#23272A', p: 4, borderRadius: 2, minWidth: 300 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Editor Settings</Typography>
          <TextField
            label="Font Size"
            type="number"
            value={fontSize}
            onChange={e => setFontSize(Number(e.target.value))}
            inputProps={{ min: 10, max: 32 }}
            sx={{ mb: 2 }}
          />
          <Button onClick={() => setSettingsOpen(false)} variant="contained">Close</Button>
        </Box>
      </Modal>
      {/* Snackbar Notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Solution submitted!"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
};

export default CodePlayground; 