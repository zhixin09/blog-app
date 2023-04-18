import {
  ListItemAvatar,
  Avatar,
  TextField,
  Button,
  Box,
  Fade,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classes from './LeaveComment.module.css';
import { useAuth } from '../../contexts/AuthContext';
import { serverTimestamp } from 'firebase/firestore';

const LeaveComment = ({ addComment }) => {
  const { currentUser } = useAuth();
  const [isFocused, setIsFocused] = useState(false);
  const [comment, setComment] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    const newComment = {
      author: currentUser.displayName,
      content: comment,
      date: serverTimestamp(),
      postID: id,
    };
    setComment('');
    addComment(newComment);
  };

  const redirect = () => {
    navigate('/login');
  };

  return (
    <>
      <ListItemAvatar>
        <Avatar>{currentUser.displayName.charAt(0)}</Avatar>
      </ListItemAvatar>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <TextField
          placeholder="Add a comment..."
          variant="standard"
          multiline
          className={classes.CommentField}
          focused={isFocused}
          onFocus={currentUser ? handleFocus : redirect}
          value={comment}
          onChange={handleChange}
          inputProps={{ sx: { fontSize: 15, fontWeight: '500' } }}
        />
        {isFocused && (
          <Fade in={isFocused}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                mt: 1,
                gap: 1,
              }}
            >
              <Button
                variant="text"
                sx={{ borderRadius: 25, textTransform: 'none', color: 'black' }}
                onClick={() => {
                  setIsFocused(false);
                  setComment('');
                }}
              >
                Cancel
              </Button>
              <Button
                variant="text"
                sx={{ borderRadius: 25, textTransform: 'none', color: 'black' }}
                onClick={handleSubmit}
              >
                Comment
              </Button>
            </Box>
          </Fade>
        )}
      </Box>
    </>
  );
};

export default LeaveComment;
