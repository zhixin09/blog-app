import React from 'react';
import {
  Avatar,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import FormatDateMessage from '../../utility/FormatDateMessage';

const Comment = (props) => {
  const { author, content, date } = props;
  const currentDate = new Date();
  const commentDate = date.toDate();
  const publishedTime = FormatDateMessage(currentDate, commentDate);

  return (
    <>
      <ListItemAvatar>
        <Avatar>{author.charAt(0)}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <>
            <Typography
              component="span"
              color="text.primary"
              fontWeight={600}
              variant="body2"
            >
              {author}
            </Typography>
            <Typography
              ml={1}
              component="span"
              color="text.secondary"
              variant="body2"
            >
              {publishedTime}
            </Typography>
          </>
        }
        secondary={<Typography variant="body2">{content}</Typography>}
      />
    </>
  );
};

export default Comment;
