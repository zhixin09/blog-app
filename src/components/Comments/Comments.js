import { List, ListItem } from '@mui/material';
import React from 'react';
import Comment from '../Comment/Comment';
import LeaveComment from '../LeaveComment/LeaveComment';

const Comments = ({ comments, addComment }) => {
  return (
    <List>
      <ListItem alignItems="flex-start">
        <LeaveComment addComment={addComment} />
      </ListItem>
      {comments.map((doc) => (
        <ListItem key={doc.id} alignItems="flex-start">
          <Comment
            author={doc.author}
            content={doc.content}
            date={doc.date}
            postID={doc.postID}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default Comments;
