import React from "react";
import { useQuery } from "@apollo/client";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

import Post from "./Post";
import FETCH_POSTS_QUERY from "../util/graphql";

function GraphQL() {
  const { loading, data: { getPosts: posts } = {} } = useQuery(
    FETCH_POSTS_QUERY
  );

  return (
    <Container maxWidth='sm'>
      <h1>GraphQL</h1>
      {posts ? (
        <Grid container spacing={3}>
          {posts.map((post) => (
            <Grid item xs={12}>
              <Paper elevation={2}>
                <Post post={post} />
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </Container>
  );
}

export default GraphQL;
