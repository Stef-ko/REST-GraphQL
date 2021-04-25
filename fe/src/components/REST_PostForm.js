import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";

import { TextField } from "@material-ui/core";
import { useState } from "react";

import httpRestService from "../services/httpRest.service";
import { SettingsInputCompositeSharp } from "@material-ui/icons";

// import CREATE_POST_MUTATION from "../util/graphql";

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

function RESTPostForm() {
  const classes = useStyles();

  const [postBody, setPostBody] = useState();
  const [inputFocused, setInputFocus] = useState();

  const createPost = () => {
    httpRestService
      .create(postBody)
      .then((res) => {
        //TODO Callback Method to return new post to Rest Page
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost();
    setPostBody("");
    //TODO reset Textfield after post was submitted
    console.log(postBody);
    setInputFocus(false);
    // setInputFocus({ postBody } === "" ? true : false);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={<Avatar aria-label='recipe'>S</Avatar>}
        title='User Name'
        subheader=''
      />
      <CardContent>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <FormControl fullWidth>
            <TextField
              id='outlined-multiline-static'
              label='New Post'
              multiline
              rows={4}
              fullWidth
              variant='outlined'
              name='postBody'
              required
              value={postBody}
              autoFocus={inputFocused}
              onChange={(e) => setPostBody(e.target.value)}
            />
            <CardActions>
              <Button
                type='submit'
                value='SubmitPost'
                variant='contained'
                color='secondary'
              >
                Submit
              </Button>
            </CardActions>
          </FormControl>
        </form>
      </CardContent>
    </Card>
  );
}

export default RESTPostForm;
