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
        <Typography variant="h3" align="center" sx={{ mt: 2 }} fontWeight={600}>
          Blog Post
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'center', mt: 1 }}>
          we encourage our users to share their stories, opinions, and
          perspectives with one another. We believe that by fostering open and
          respectful dialogue, we can create a more informed and empathetic
          society. So, whether you want to share your latest travel adventure,
          discuss the latest news, or simply connect with others, we invite you
          to join our community and enjoy the space.
        </Typography>

        {loading ? (
          <Spinner />
        ) : (
          <Posts posts={posts} handleDelete={handleDelete} />
        )}
      </Container>
    </div>
  );
};

export default Home;
