import React from "react";
import { IconButton, makeStyles } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import httpRestService from "../services/httpRest.service";

function DeleteButton({ postId, parentCallback }) {
  const useStyles = makeStyles({
    DeleteButton: {
      padding: "0 0 auto 0",
      textAlign: "right",
    },
  });

  const deletePost = () => {
    httpRestService
      .delete(`deletepost/${postId}`)
      .then((res) => {
        parentCallback(postId);
      })
      .catch((e) => {
        console.log(e);
      });
  };

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

export default DeleteButton;
