import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase-config';
import { Container, Typography, Box, Divider, Backdrop } from '@mui/material';

const PostDetail = () => {
  const { id } = useParams();
  const [postDetail, setPostDetail] = useState();

  const getPostDetail = async () => {
    const postDocRef = doc(db, 'posts', id);
    const data = await getDoc(postDocRef);
    const newDate = new Date(
      data.data().date.seconds * 1000
    ).toLocaleDateString();
    const newData = { ...data.data(), date: newDate };
    setPostDetail(newData);
  };
  useEffect(() => {
    id && getPostDetail();
  }, [id]);
  return (
    <div>
      <Box
        sx={{
          backgroundImage: `url('${postDetail?.imageUrl}')`,
          boxShadow: 'inset 0 0 0 50vw rgba(0,0,0,0.5)',
          backgroundRepeat: 'no-repeat',
          height: 400,
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
      <Container maxWidth="lg">
        <Typography variant="body1" py={2}>
          By {postDetail?.author} - {postDetail?.date}
        </Typography>
        <Divider />
        <Typography variant="body2" py={2}>
          {postDetail?.content}
        </Typography>
      </Container>
    </div>
  );
};

export default PostDetail;
