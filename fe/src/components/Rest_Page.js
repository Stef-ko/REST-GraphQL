import React, { useEffect, useState } from "react";

import {
  Container,
  Paper,
  Grid,
  Grow,
  CircularProgress,
  Card,
} from "@material-ui/core";

import PostForm from "./PostForm";

import httpRestService from "../services/httpRest.service";
import Post from "./Post";

function Rest() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    retrievePosts();
  }, []);

  const retrievePosts = () => {
    httpRestService
      .getAll()
      .then((res) => {
        setPosts(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Container maxWidth='md'>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <h1>Rest</h1>
          {posts ? (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper>
                  <PostForm />
                </Paper>
              </Grid>
              {posts.map((post) => (
                //TODO set unique key for rest and graphql post
                <Grid key={post.createdAt} item xs={12}>
                  <Grow
                    in={true}
                    style={{ transformOrigin: "0 0 0" }}
                    timeout={800}
                  >
                    <Paper elevation={2}>
                      <Post post={post} />
                    </Paper>
                  </Grow>
                </Grid>
              ))}
            </Grid>
          ) : (
            <CircularProgress />
          )}
        </Grid>
        <Grid item xs={6}>
          <h1>Request</h1>
          <Grid>
            <Card>
              <p>
                Request URL:<code>http://localhost:8080/api/posts</code>
                <br />
                <br />
                Request Method: <code>GET</code>
              </p>
            </Card>
          </Grid>
          <h1>Response</h1>
          <Grid item xs={12}>
            <Card>
              <p>{JSON.stringify(posts)}</p>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Rest;
