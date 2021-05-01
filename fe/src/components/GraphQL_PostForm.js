import React, { useContext, useEffect, useState, useStateRef } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";

import { TextField } from "@material-ui/core";
import { gql, useMutation } from "@apollo/client";

import FETCH_POSTS_QUERY from "../util/graphql";
import { Context } from "../Store/GraphQL_Request_Store";

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

function GraphQLPostForm() {
  const [state, dispatch] = useContext(Context);

  const classes = useStyles();

  const [postBody, setPostBody] = useState();
  const [inputFocused, setInputFocus] = useState();

  // createPostResult hängt hinterher, zeigt immer Inhalt des Vorgängers
  // TODO Find out how to set createPostResult immideately
  const [createPostResult, setCreatePostResult] = useState("dfad");

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: { body: postBody },
    update(proxy, result) {
      const data = proxy.readQuery({ query: FETCH_POSTS_QUERY });

      setCreatePostResult(JSON.stringify(result, null, 2));

      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: { getPosts: [result.data.createPost, ...data.getPosts] },
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost();
    setPostBody("");
    //TODO reset Textfield after post was submitted
    setInputFocus(false);
    // setInputFocus({ postBody } === "" ? true : false);
    dispatch({
      type: "ADD_GRAPHQL_REQUEST",
      payload: {
        Request: "Add Post",
        RequestMethod: "POST",
        RequestURL: "http://localhost:5000/",
        RequestBody: CREATE_POST_MUTATION.loc.source.body,
        Response: createPostResult,
      },
    });
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

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
    }
  }
`;

export default GraphQLPostForm;
