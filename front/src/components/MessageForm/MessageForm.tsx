import React, { useState } from 'react';
import { Box, Stack, TextField, IconButton } from '@mui/material';
import SendSharpIcon from '@mui/icons-material/SendSharp';
import './MessageForm.css';

interface IProps {
  onSubmit: (message: string) => void;
}

const MessageForm: React.FC<IProps> = ({ onSubmit }) => {
  const [text, setText] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit(text);

    setText('');
  };

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <Stack direction="row" sx={{ alignItems: 'center' }} spacing={2}>
        <TextField
          fullWidth
          placeholder="type something..."
          name="message"
          sx={{
            '& .MuiInputBase-input::placeholder': {
              color: 'white',
            },
            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
            },
          }}
          InputProps={{
            sx: {
              color: 'white',
            },
          }}
          required
          size="small"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <Box
          sx={{
            borderRadius: '50%',
            backgroundColor: '#0080FF',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <IconButton component="button" type="submit">
            <SendSharpIcon
              sx={{
                color: 'white',
              }}
            />
          </IconButton>
        </Box>
      </Stack>
    </form>
  );
};

export default MessageForm;
