import React, { useContext, useEffect, useState } from "react";
import { IconButton, makeStyles } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import httpRestService from "../services/httpRest.service";
import { Context } from "../Store/REST_Request_Store";

function DeleteButton({ postId, parentCallback }) {
  const useStyles = makeStyles({
    DeleteButton: {
      padding: "0 0 auto 0",
      textAlign: "right",
    },
  });

  const [state, dispatch] = useContext(Context);
  const [deletePostResult, setDeletePostResult] = useState();

  const deletePost = () => {
    httpRestService
      .delete(`deletepost/${postId}`)
      .then((res) => {
        setDeletePostResult(() => JSON.stringify(res, null, 2));
        parentCallback(postId);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //TODO Store Delete Request in Context
  useEffect(() => {
    if (deletePostResult) {
      dispatch({
        type: "Add_REST_REQUEST",
        payload: {
          Request: "Delete Post",
          RequestMethod: "DELETE",
          RequestBody: "",
          RequestURL: `http://localhost:8080/api/posts/deletepost/${postId}`,
          Response: deletePostResult,
        },
      });
    }
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

export default DeleteButton;
