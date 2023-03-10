import {
  Button,
  Card,
  CardHeader,
  Avatar,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';

const Post = (props) => {
  const { id, title, author, content, date, imageUrl } = props;

  const formattedDate = new Date(date.seconds * 1000).toLocaleDateString();
  return (
    <div>
      <Card>
        <CardHeader
          avatar={<Avatar>{author.charAt(0)}</Avatar>}
          title={author}
          subheader={formattedDate}
        />
        <CardMedia sx={{ height: 250 }} component="img" image={imageUrl} />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              maxWidth: 500,
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              maxWidth: 500,
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
          >
            {content}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" component={Link} to={`/detail/${id}`}>
            read more
          </Button>
          <IconButton aria-label="add to favorites">
            <DeleteIcon color="error" />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
};

export default Post;
