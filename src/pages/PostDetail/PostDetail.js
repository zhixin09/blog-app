import { doc, getDoc, getDocs, collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase-config';
import {
  Container,
  Typography,
  Box,
  Divider,
  Grid,
  Avatar,
} from '@mui/material';
import Spinner from '../../components/Spinner/Spinner';
import Posts from '../../components/Posts/Posts';
import Moment from 'react-moment';

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
            <Typography variant="h4" fontWeight={600} color="white">
              {postDetail?.title}
            </Typography>
          </Box>
        </Box>

        <Grid container>
          <Grid item md={8} xs={12}>
            <Box mr={2}>
              <Box
                sx={{ display: 'flex', gap: 2, alignItems: 'center', py: 2 }}
              >
                <Avatar>{postDetail?.author.charAt(0)}</Avatar>
                <Box display="flex" flexDirection="column">
                  <Typography variant="body1">{postDetail?.author}</Typography>
                  <Typography variant="body2">
                    <Moment format="MMM D, YYYY">{postDetail?.date}</Moment>
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ bgcolor: 'black' }} />
              <Typography variant="body2" py={2}>
                {postDetail?.content}
              </Typography>

              <Box py={2}>
                <Typography variant="h6" py={2.75} fontWeight={600}>
                  Comments
                </Typography>
                <Divider sx={{ bgcolor: 'black' }} />
              </Box>
            </Box>
          </Grid>

          <Grid item md={4} xs={12}>
            <Typography variant="h6" py={2.75} fontWeight={600}>
              Other Posts
            </Typography>
            <Divider sx={{ bgcolor: 'black' }} />
            <Box py={2}>
              {loading ? (
                <Spinner />
              ) : (
                <Posts posts={posts} otherPosts={true} />
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default PostDetail;
