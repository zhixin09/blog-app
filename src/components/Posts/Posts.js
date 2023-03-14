import React, { useState } from 'react';
import { db } from '../../firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import Post from '../Post/Post';
import { useEffect } from 'react';
import { Typography, Box, Grid } from '@mui/material';
import Spinner from '../Spinner/Spinner';

const Posts = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    setLoading(true);
    console.log('RAN GET POST');
    const postsCollectionRef = collection(db, 'posts');
    const data = await getDocs(postsCollectionRef);
    console.log(data.docs);
    setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setLoading(false);
  };

  useEffect(() => {
    return () => {
      getPosts();
    };
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Grid container spacing={2}>
        {posts.map((doc) => (
          <Grid item xs={4} key={doc.id}>
            <Post
              id={doc.id}
              title={doc.title}
              author={doc.author}
              content={doc.content}
              date={doc.date}
              imageUrl={doc.imageUrl}
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
