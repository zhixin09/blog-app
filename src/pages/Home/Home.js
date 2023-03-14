import React from 'react';
import { useState, useEffect } from 'react';
import { Typography, Container } from '@mui/material';
import { db } from '../../firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import Posts from '../../components/Posts/Posts';
import Spinner from '../../components/Spinner/Spinner';

const Home = () => {
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(true);

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
      console.log('ON MOUNT RENDER');
      getPosts();
    };
  }, []);

  return (
    <div>
      TEST
      <Container
        maxWidth="lg"
        sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
      >
        <Typography variant="h3" align="center" sx={{ mt: 2 }}>
          Blog Post
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'center', mt: 1 }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
        </Typography>
        <Container>{loading ? <Spinner /> : <Posts posts={posts} />}</Container>
      </Container>
    </div>
  );
};

export default Home;
