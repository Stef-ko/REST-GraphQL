import React from "react";
import { IconButton, makeStyles } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { gql, useMutation } from "@apollo/client";

//TODO: Remove deleted post from cache
function DeleteButton({ postId }) {
  const useStyles = makeStyles({
    DeleteButton: {
      padding: "0 0 auto 0",
      textAlign: "right",
    },
  });

  const [deletePost, { error }] = useMutation(DELETE_POST_MUTATION, {
    variables: { postId: postId },
  });

  const classes = useStyles();
  return (
    <IconButton
      variant='outlined'
      color='secondary'
      aria-label='delete post'
      className={classes.DeleteButton}
      onClick={deletePost}
    >
      <DeleteIcon />
    </IconButton>
  );
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export default DeleteButton;
