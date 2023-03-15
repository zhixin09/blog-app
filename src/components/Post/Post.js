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
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Post = (props) => {
  const { id, title, author, content, date, imageUrl, handleDelete } = props;

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
        <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="contained"
            size="small"
            component={Link}
            to={`/detail/${id}`}
          >
            read more
          </Button>
          <div>
            <IconButton
              onClick={() => {
                handleDelete(id);
              }}
            >
              <DeleteIcon color="error" />
            </IconButton>
            <IconButton>
              <EditIcon color="success" />
            </IconButton>
          </div>
        </CardActions>
      </Card>
    </div>
  );
};

export default Post;
