import { doc, getDoc, getDocs, collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase-config';
import { Container, Typography, Box, Divider, Grid } from '@mui/material';
import Spinner from '../../components/Spinner/Spinner';
import Posts from '../../components/Posts/Posts';

const PostDetail = () => {
  const { id } = useParams();
  const [postDetail, setPostDetail] = useState();
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(true);

  const postsCollectionRef = collection(db, 'posts');

  const getPostDetail = async () => {
    const postDocRef = doc(db, 'posts', id);
    const data = await getDoc(postDocRef);
    const newDate = new Date(
      data.data().date.seconds * 1000
    ).toLocaleDateString();
    const newData = { ...data.data(), date: newDate };
    setPostDetail(newData);
  };

  const getOtherPosts = async () => {
    try {
      setLoading(true);
      const data = await getDocs(postsCollectionRef);
      console.log(data.docs);
      setPosts(
        data.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .filter((post) => post.id !== id)
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    id && getPostDetail() && getOtherPosts();
  }, [id]);
  return (
    <>
      <Container maxWidth="lg">
        <Box
          sx={{
            backgroundImage: `url('${postDetail?.imageUrl}')`,
            boxShadow: 'inset 0 0 0 50vw rgba(0,0,0,0.5)',
            backgroundRepeat: 'no-repeat',
            height: 200,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography variant="h3" color="white">
              {postDetail?.title}
            </Typography>
          </Box>
        </Box>

        <Grid container>
          <Grid item md={8} xs={12} bgcolor="red">
            <Box mr={2}>
              <Typography variant="body1" py={2}>
                By {postDetail?.author} - {postDetail?.date}
              </Typography>
              <Divider />
              <Typography variant="body2" py={2}>
                {postDetail?.content}
              </Typography>
            </Box>
          </Grid>

          <Grid item md={4} xs={12}>
            <Typography variant="body1" py={2}>
              Other Posts
            </Typography>
            <Divider />
            <Box py={2}>
              {loading ? (
                <Spinner />
              ) : (
                <Posts posts={posts} otherPosts={true} />
              )}
            </Box>
          </Grid>

          <Grid item md={8} xs={12} bgcolor="green">
            test
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6} md={8}>
            xs=6 md=8
          </Grid>
          <Grid item xs={6} md={4}>
            xs=6 md=8
          </Grid>
          <Grid item xs={6} md={4}>
            xs=6 md=8
          </Grid>
          <Grid item xs={6} md={8}>
            xs=6 md=8
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default PostDetail;
