import React from 'react';
import {
  Typography,
  AppBar,
  Button,
  CameraIcon,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Container,
  Box,
  Stack,
} from '@mui/material';
import Header from '../../components/Header/Header';
import Post from '../../components/Post/Post';

const Home = () => {
  return (
    <div>
      <Header />
      <Container>
        <Typography variant="h3" align="center" sx={{ mt: 2 }}>
          Blog Post
        </Typography>
        <Container maxWidth="md">
          <Typography variant="body1" sx={{ textAlign: 'center', mt: 1 }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </Typography>
        </Container>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 2,
            mt: 4,
          }}
        >
          <Post />
          <Post />
          <Post />
        </Box>
      </Container>
    </div>
  );
};

export default Home;
