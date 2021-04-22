import React from "react";
import { useQuery } from "@apollo/client";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grow from "@material-ui/core/Grow";
import Card from "@material-ui/core/Card";
import { CardContent } from "@material-ui/core";

import Post from "./Post";
import PostForm from "./PostForm";
import FETCH_POSTS_QUERY from "../util/graphql";
import { parse } from "graphql";

function GraphQL() {
  const { loading, error, data: { getPosts: posts } = {} } = useQuery(
    FETCH_POSTS_QUERY
  );

  return (
    <Container maxWidth='md'>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <h1>GraphQL</h1>
          {posts ? (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper>
                  <PostForm />
                </Paper>
              </Grid>
              {posts.map((post) => (
                <Grid key={post.id} item xs={12}>
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
              <CardContent>
                <p>
                  Request URL:{" "}
                  <a href='http://localhost:5000/'>
                    <code>http://localhost:5000/</code>
                  </a>
                  <br />
                  <br />
                  Request Method: <code>POST</code>
                  <br />
                  <br />
                  <code>
                    query {"{"}
                    <br />
                    &nbsp; getPosts {"{"}
                    <br />
                    &nbsp; &nbsp; id
                    <br />
                    &nbsp; &nbsp; body
                    <br />
                    &nbsp; &nbsp; createdAt
                    <br />
                    &nbsp; {"}"}
                    <br />
                    {"}"};
                  </code>
                </p>
              </CardContent>
            </Card>
          </Grid>
          <h1>Response</h1>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <p>
                  <code>
                    <pre>{JSON.stringify(posts, null, 2)}</pre>
                  </code>
                </p>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default GraphQL;
