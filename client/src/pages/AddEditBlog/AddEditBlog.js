import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  LinearProgress,
  Alert,
} from '@mui/material';
import { db, storage } from '../../firebase-config';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import {
  addDoc,
  collection,
  getDoc,
  serverTimestamp,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const AddEditBlog = () => {
  const [alert, setAlert] = useState(false);
  const [post, setPost] = useState();
  const { currentUser } = useAuth();
  const titleRef = useRef();
  const contentRef = useRef();
  const [imgUrl, setImgUrl] = useState();
  const [imgFile, setImgFile] = useState();
  const [progress, setProgress] = useState();
  const navigate = useNavigate();

  //URL has dynamic parameter
  const { id } = useParams();

  const collectionRef = collection(db, 'posts');

  const getPost = async () => {
    const docRef = doc(db, 'posts', id);
    const data = await getDoc(docRef);
    setPost(data.data());
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const addPost = async () => {
    try {
      await addDoc(collectionRef, {
        userID: currentUser.uid,
        title: titleRef.current.value,
        author: currentUser.displayName,
        content: contentRef.current.value,
        date: serverTimestamp(),
        imageUrl: imgUrl,
      });
      toast.success('Post Added!'), { position: 'top-center', autoClose: 5000 };
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const editPost = async (id) => {
    try {
      await updateDoc(doc(db, 'posts', id), {
        userID: currentUser.uid,
        title: titleRef.current.value,
        author: currentUser.displayName,
        content: contentRef.current.value,
        date: serverTimestamp(),
        imageUrl: imgUrl,
      });
      toast.success('Post Updated!'),
        { position: 'top-center', autoClose: 5000 };
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      // titleRef.current.value &&
      // contentRef.current.value &&
      // imgUrl &&
      currentUser
    ) {
      if (id) {
        //edit post
        editPost(id);
      } else {
        //add post
        addPost();
      }
    } else {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 2000);
    }
  };

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    id && getPost();
  }, [id]);

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
      <ToastContainer />
      <Container maxWidth="sm" sx={{ p: 2 }}>
        <Typography
          variant="h3"
          textAlign="center"
          fontWeight={600}
          gutterBottom
        >
          {id ? 'Edit Post' : 'Create Post'}
        </Typography>
        {alert && (
          <Alert severity="error" sx={{ my: 2 }}>
            Please login to create post
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                inputRef={titleRef}
                label="Title"
                name="title"
                fullWidth
                value={post && post.title}
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
                required
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputRef={contentRef}
                label="Content"
                name="content"
                type="textarea"
                fullWidth
                multiline
                rows={4}
                value={post && post.content}
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
                required
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom fontWeight="light">
                Upload an image*
              </Typography>
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
                {id ? 'Edit Post' : 'Add Post'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
};

export default AddEditBlog;
