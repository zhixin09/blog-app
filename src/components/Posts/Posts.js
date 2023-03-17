import React from 'react';
import Post from '../Post/Post';
import { Grid } from '@mui/material';

const Posts = ({ posts, handleDelete }) => {
  return (
    <>
      <Grid container spacing={2}>
        {posts.map((doc) => (
          <Grid item xs={12} sm={6} md={4} key={doc.id}>
            <Post
              id={doc.id}
              userID={doc.userID}
              title={doc.title}
              author={doc.author}
              content={doc.content}
              date={doc.date}
              imageUrl={doc.imageUrl}
              handleDelete={handleDelete}
            />
          </Grid>
        ))}
      </Grid>

      {/* {!posts > 0 && (
        <Typography variant="h4" sx={{ textAlign: 'center' }}>
          No Post
        </Typography>
      )} */}
    </>
  );
};

export default Posts;
