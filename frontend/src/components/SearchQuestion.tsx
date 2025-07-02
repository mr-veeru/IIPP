import React, { useState } from 'react';
import { TextField, Autocomplete } from '@mui/material';
import api from '../api';

const SearchQuestion: React.FC<{ onSelect: (title: string) => void }> = ({ onSelect }) => {
  const [options, setOptions] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const handleInputChange = async (_: any, value: string) => {
    setInput(value);
    try {
      const res = await api.get('/questions/search', { params: { q: value } });
      setOptions(res.data.map((q: any) => q.title));
    } catch {
      setOptions([]);
    }
    onSelect(value);
  };

  return (
    <Autocomplete
      freeSolo
      options={options}
      inputValue={input}
      onInputChange={handleInputChange}
      onChange={(_, value) => value && onSelect(value)}
      renderInput={params => (
        <TextField
          {...params}
          label="Search Questions"
          variant="outlined"
          sx={{
            mb: 2,
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
      )}
    />
  );
};

export default SearchQuestion; 