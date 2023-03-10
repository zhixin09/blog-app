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
import Post from '../../components/Post/Post';
import Posts from '../../components/Posts/Posts';

const Home = () => {
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
          <Posts />
        </Container>
      </Container>
    </div>
  );
};

export default Home;
