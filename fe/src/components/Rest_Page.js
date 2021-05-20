import React, { useEffect, useState } from "react";

import {
  Container,
  Paper,
  Grid,
  Grow,
  CircularProgress,
} from "@material-ui/core";

import httpRestService from "../services/httpRest.service";
import RESTPost from "./RESTPost";
import RESTPostForm from "./REST_PostForm";
import RESTRequestAccordion from "./REST_RequestAccordion";

function Rest() {
  const [restposts, setPosts] = useState([]);

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

  const createcallbackFunction = (RESTPostNew) => {
    setPosts([RESTPostNew.data, ...restposts]);
  };

  const deleteCallbackFunction = (postId) => {
    setPosts([...restposts.filter((p) => p._id !== postId)]);
  };

  return (
    <Container maxWidth='md'>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <h1>REST</h1>
          {restposts ? (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper>
                  <RESTPostForm parentCallback={createcallbackFunction} />
                </Paper>
              </Grid>
              {restposts.map((restpost) => (
                //TODO set unique key for rest and graphql post
                <Grid key={restpost.createdAt} item xs={12}>
                  <Grow
                    in={true}
                    style={{ transformOrigin: "0 0 0" }}
                    timeout={800}
                  >
                    <Paper elevation={2}>
                      <RESTPost
                        parentCallback={deleteCallbackFunction}
                        restpost={restpost}
                      />
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
          <h1>Requests</h1>
          <RESTRequestAccordion />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Rest;
