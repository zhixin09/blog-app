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
  CardActionArea,
} from '@mui/material';
import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useAuth } from '../../contexts/AuthContext';
import Excerpt from '../../utility/Excerpt';

const Post = (props) => {
  const { currentUser } = useAuth();
  const {
    id,
    userID,
    title,
    author,
    content,
    date,
    imageUrl,
    handleDelete,
    otherPosts,
  } = props;

  const formattedDate = new Date(date.seconds * 1000).toLocaleDateString();

  return (
    <div>
      {!otherPosts ? (
        <Card>
          <CardHeader
            avatar={<Avatar>{author.charAt(0)}</Avatar>}
            title={author}
            subheader={formattedDate}
          />
          <CardMedia sx={{ height: 250 }} component="img" image={imageUrl} />
          <CardContent>
            <Typography variant="h6" fontWeight={600}>
              {Excerpt(title, 28)}
            </Typography>
            <Typography variant="subtitle1">
              <Moment format="MMM D, YYYY">{formattedDate}</Moment>
            </Typography>
            <Typography variant="subtitle1">{Excerpt(content, 75)}</Typography>
          </CardContent>
          <CardActions
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Button
              variant="contained"
              component={Link}
              to={`/detail/${id}`}
              sx={{ mb: 1 }}
            >
              read more
            </Button>

            {currentUser && userID == currentUser.uid && (
              <div>
                <IconButton
                  onClick={() => {
                    handleDelete(id);
                  }}
                >
                  <DeleteIcon color="error" />
                </IconButton>
                <IconButton component={Link} to={`update/${id}`}>
                  <EditIcon color="success" />
                </IconButton>
              </div>
            )}
          </CardActions>
        </Card>
      ) : (
        <CardActionArea component={Link} to={`/detail/${id}`}>
          <Card sx={{ display: 'flex', height: 150 }}>
            <CardContent sx={{ flex: 1 }}>
              <Typography variant="h6" fontWeight={600}>
                {Excerpt(title, 19)}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <Moment format="MMM D, YYYY">{formattedDate}</Moment>
              </Typography>
              <Typography variant="body2" paragraph>
                {Excerpt(content, 60)}
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              sx={{
                width: '30%',
                display: { xs: 'none', sm: 'none', md: 'block' },
              }}
              image={imageUrl}
            />
          </Card>
        </CardActionArea>
      )}
    </div>
  );
};

export default Post;
