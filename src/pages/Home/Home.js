import React from 'react';
import { useState, useEffect } from 'react';
import { Typography, Container } from '@mui/material';
import { db } from '../../firebase-config';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import Posts from '../../components/Posts/Posts';
import Spinner from '../../components/Spinner/Spinner';

const Home = () => {
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(true);

  const postsCollectionRef = collection(db, 'posts');

  const getPosts = async () => {
    try {
      setLoading(true);
      const data = await getDocs(postsCollectionRef);
      console.log(data.docs);
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await deleteDoc(doc(db, 'posts', id));
      const data = await getDocs(postsCollectionRef);
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
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
        <Container>
          {loading ? (
            <Spinner />
          ) : (
            <Posts posts={posts} handleDelete={handleDelete} />
          )}
        </Container>
      </Container>
    </div>
  );
};

export default Home;
