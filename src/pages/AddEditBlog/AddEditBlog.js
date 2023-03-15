import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  FormLabel,
  LinearProgress,
} from '@mui/material';
import { db, storage } from '../../firebase-config';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import { useParams } from 'react-router-dom';

const AddEditBlog = () => {
  const { currentUser } = useAuth();
  const titleRef = useRef();
  const contentRef = useRef();
  const [imgUrl, setImgUrl] = useState();
  const [imgFile, setImgFile] = useState();
  const [progress, setProgress] = useState();

  //URL has dynamic parameter
  const { id } = useParams();

  const docRef = collection(db, 'posts');
  const addPost = async () => {
    try {
      await addDoc(docRef, {
        userID: currentUser.uid,
        title: titleRef.current.value,
        author: currentUser.displayName,
        content: contentRef.current.value,
        date: serverTimestamp(),
        imageUrl: imgUrl,
      });
      alert('Post Added!');
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert('Please login before creating a post');
    }
    if (
      titleRef.current.value &&
      contentRef.current.value &&
      imgUrl &&
      currentUser
    ) {
      addPost();
    } else {
      console.log('Missing input data!');
      console.log(titleRef.current.value);
    }
  };

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, imgFile.name);
      const uploadTask = uploadBytesResumable(storageRef, imgFile);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          switch (snapshot.state) {
            case 'paused':
              console.log('upload is paused');
              break;
            case 'running':
              console.log('upload is running');
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log('error');
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setImgUrl(downloadUrl);
          });
        }
      );
    };

    imgFile && uploadFile();
  }, [imgFile]);

  return (
    <>
      {!currentUser && <Typography>NO CURRENT USER</Typography>}
      <Container maxWidth="sm" sx={{ p: 2 }}>
        <Typography variant="h4" textAlign="center" py={2}>
          {id ? 'Edit Post' : 'Create Post'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                inputRef={titleRef}
                label="Title"
                fullWidth
                required
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputRef={contentRef}
                label="Content"
                type="textarea"
                fullWidth
                multiline
                rows={4}
                required
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <FormLabel>Upload an image</FormLabel>
              <TextField
                type="file"
                fullWidth
                onChange={(e) => setImgFile(e.target.files[0])}
                required
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              {progress && (
                <LinearProgress
                  variant="determinate"
                  value={Math.round(progress)}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                type="submit"
                fullWidth
                disabled={progress !== null && progress < 100}
              >
                Add Post
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
};

export default AddEditBlog;
