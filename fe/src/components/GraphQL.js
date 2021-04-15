import React from "react";
import { useQuery } from "@apollo/client";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";

import Post from "./Post";
import FETCH_POSTS_QUERY from "../util/graphql";
import moment from "moment";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function GraphQL() {
  const classes = useStyles();
  const { loading, data: { getPosts: posts } = {} } = useQuery(
    FETCH_POSTS_QUERY
  );

  return (
    <Container maxWidth='sm'>
      <h1>GraphQL</h1>
      {posts ? (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper>
              <Card className={classes.root}>
                <CardHeader
                  avatar={<Avatar aria-label='recipe'>S</Avatar>}
                  title='User Name'
                  subheader=''
                />
                <CardContent>
                  <Typography
                    className={classes.title}
                    color='textSecondary'
                    gutterBottom
                  ></Typography>
                  <TextField
                    id='outlined-multiline-static'
                    label='New Post'
                    multiline
                    rows={4}
                    fullWidth
                    variant='outlined'
                  />
                  <CardActions>
                    <Button type='submit' variant='contained' color='secondary'>
                      Submit
                    </Button>
                  </CardActions>
                </CardContent>
              </Card>
            </Paper>
          </Grid>
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
