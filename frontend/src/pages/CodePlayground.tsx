import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Alert, 
  CircularProgress, 
  Paper,
  IconButton,
  Tooltip,
  Chip
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import SettingsIcon from '@mui/icons-material/Settings';
import api from '../api';

// Import the code editor and Prism
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism-tomorrow.css'; // VS Code-like dark theme

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

  const lineCount = code.split('\n').length;

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ 
        p: 2, 
        background: 'linear-gradient(135deg, #1e1e1e 0%, #2d2d30 100%)',
        borderBottom: '1px solid #3e3e42'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h5" sx={{ color: 'white', fontWeight: 600 }}>
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
              <IconButton onClick={handleCopyCode} sx={{ color: 'white' }}>
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Download Code">
              <IconButton onClick={handleDownloadCode} sx={{ color: 'white' }}>
                <DownloadIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Settings">
              <IconButton sx={{ color: 'white' }}>
                <SettingsIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
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

          {/* Code Area with real editor */}
          <Box sx={{ 
            flex: 1, 
            background: '#1e1e1e',
            overflow: 'auto',
            position: 'relative',
            p: 2
          }}>
            <Editor
              value={code}
              onValueChange={setCode}
              highlight={code => Prism.highlight(code, Prism.languages.python, 'python')}
              padding={16}
              style={{
                fontFamily: 'Consolas, Monaco, monospace',
                fontSize: 14,
                background: '#1e1e1e',
                color: '#d4d4d4',
                minHeight: '400px',
                outline: 'none',
                borderRadius: 8,
                boxShadow: '0 0 0 1px #3e3e42',
                caretColor: 'white',
                tabSize: 4,
                width: '100%',
                resize: 'none',
              }}
              textareaId="code-playground-editor"
              textareaClassName="code-playground-textarea"
              preClassName="code-playground-pre"
              spellCheck={false}
              autoFocus
            />
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

          {/* Run Button */}
          <Box sx={{ p: 2, borderBottom: '1px solid #3e3e42' }}>
            <Button
              variant="contained"
              onClick={handleRun}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <PlayArrowIcon />}
              fullWidth
              sx={{
                background: '#007acc',
                '&:hover': {
                  background: '#005a9e',
                },
                '&:disabled': {
                  background: '#3e3e42',
                },
              }}
            >
              {loading ? 'Running...' : 'Run Code'}
            </Button>
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
    </Box>
  );
};

export default CodePlayground; 