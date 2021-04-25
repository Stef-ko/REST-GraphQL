import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { CardContent, IconButton } from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import CommentIcon from "@material-ui/icons/Comment";
import EditIcon from "@material-ui/icons/Edit";
import moment from "moment";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import Grow from "@material-ui/core/Grow";

import GraphQLDeleteButton from "./GraphQL_DeleteButton";
import { gql, useMutation } from "@apollo/client";
import FETCH_POSTS_QUERY from "../util/graphql";

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

function Post({ post: { id, body, createdAt } }) {
  const [editMode, setEditMode] = useState(false);
  const [postBody, setPostBody] = useState(body);

  const classes = useStyles();

  const [updatePost, { error }] = useMutation(UPDATE_POST_MUTATION, {
    variables: { postId: id, body: postBody },
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: {
            id: id,
            body: postBody,
          },
        },
        variables: {
          id: id,
        },
      });
    },
  });

  const handleSave = (e) => {
    e.preventDefault();
    updatePost();
    setEditMode(false);
  };
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label='recipe' className={classes.avatar}>
            S
          </Avatar>
        }
        title='User Name'
        subheader={moment(createdAt).fromNow()}
      />
      <CardContent>
        {editMode ? (
          <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={800}>
            <form
              onSubmit={(e) => {
                handleSave(e);
              }}
            >
              <FormControl fullWidth>
                <TextField
                  id='standard-basic'
                  label='Edit Post'
                  rows={4}
                  fullWidth
                  variant='outlined'
                  name='postBody'
                  required
                  value={postBody}
                  // autoFocus={inputFocused}
                  onChange={(e) => setPostBody(e.target.value)}
                />
                <CardActions>
                  <Button
                    type='submit'
                    value='SubmitPost'
                    variant='contained'
                    color='secondary'
                  >
                    Save
                  </Button>
                </CardActions>
              </FormControl>
            </form>
          </Grow>
        ) : (
          <Typography variant='body2' component='p'>
            {postBody}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        {editMode ? (
          <></>
        ) : (
          <>
            <IconButton color='secondary' aria-label='like post' disabled>
              <FavoriteBorderIcon />
            </IconButton>
            <IconButton color='secondary' aria-label='like post' disabled>
              <CommentIcon />
            </IconButton>
            <GraphQLDeleteButton postId={id} />
          </>
        )}
        <IconButton
          color='secondary'
          aria-label='edit post'
          onClick={() => setEditMode(!editMode)}
        >
          <EditIcon color={editMode ? "disabled" : "action"} />
        </IconButton>
      </CardActions>
    </Card>
  );
}

const UPDATE_POST_MUTATION = gql`
  mutation updatePost($postId: ID!, $body: String!) {
    updatePost(postId: $postId, body: $body) {
      id
      body
      createdAt
    }
  }
`;
export default Post;
