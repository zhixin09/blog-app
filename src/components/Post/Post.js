import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import React from 'react';
import img from '../../assets/about_me_image.png';

const Post = () => {
  return (
    <div>
      <Card>
        <CardMedia sx={{ height: 250 }} image={img} />
        <CardContent>
          <Typography variant="h6">Post Title</Typography>
          <Typography variant="body1">
            This will be the Post Content, anything written here will be the
            content
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="outlined" sx={{ color: 'custom.dark' }}>
            Learn More
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Post;
