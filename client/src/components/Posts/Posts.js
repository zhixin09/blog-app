import React from 'react';
import Post from '../Post/Post';
import { Grid } from '@mui/material';

const Posts = ({ posts, handleDelete, otherPosts }) => {
  return (
    <>
      <Grid container spacing={2}>
        {posts.map((doc) => (
          <Grid
            item
            xs={12}
            sm={otherPosts ? 12 : 6}
            md={otherPosts ? 12 : 4}
            key={doc.id}
          >
            <Post
              id={doc.id}
              userID={doc.userID}
              title={doc.title}
              author={doc.author}
              content={doc.content}
              date={doc.date}
              imageUrl={doc.imageUrl}
              handleDelete={handleDelete}
              otherPosts={otherPosts}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Posts;
