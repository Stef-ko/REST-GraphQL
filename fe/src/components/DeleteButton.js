import React from "react";
import { IconButton, makeStyles } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { gql, useMutation } from "@apollo/client";
import FETCH_POSTS_QUERY from "../util/graphql";
import { useApolloClient } from "@apollo/client";

function DeleteButton({ postId }) {
  const client = useApolloClient();

  const useStyles = makeStyles({
    DeleteButton: {
      padding: "0 0 auto 0",
      textAlign: "right",
    },
  });

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    variables: { postId: postId },
    update(proxy) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      let newData = data;
      newData = [...newData.getPosts.filter((p) => p.id !== postId)];
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: { getPosts: newData },
      });
    },
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
