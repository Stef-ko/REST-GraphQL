import React from "react";
import { IconButton, makeStyles } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { gql, useMutation } from "@apollo/client";
import FETCH_POSTS_QUERY from "../util/graphql";
import { useApolloClient } from "@apollo/client";

//TODO: Remove deleted post from cache
function DeleteButton({ postId }) {
  const client = useApolloClient();

  const useStyles = makeStyles({
    DeleteButton: {
      padding: "0 0 auto 0",
      textAlign: "right",
    },
  });

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update(proxy) {
      const data = client.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      console.log(data);
      console.log("Post Id: " + postId);
      let newData = data.getPosts.filter((p) => p.id !== postId);
      console.log(newData);
      client.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: newData,
      });
    },
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
