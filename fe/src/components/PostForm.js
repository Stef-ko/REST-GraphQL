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
import { gql, useMutation } from "@apollo/client";
import FETCH_POSTS_QUERY from "../util/graphql";

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

function PostForm() {
  const classes = useStyles();

  const [postBody, setPostBody] = useState();

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: { body: postBody },
    update(proxy, result) {
      const data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: { getPosts: [result.data.createPost, ...data.getPosts] },
      });
      postBody = "";
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost();
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
              value={postBody}
              onChange={(e) => setPostBody(e.target.value)}
              // value={this.state.postBody}
              // onChange={handlePostBodyChange}
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
    // <Card className={classes.root}>
    //     <CardHeader
    //       avatar={<Avatar aria-label='recipe'>S</Avatar>}
    //       title='User Name'
    //       subheader=''
    //     />
    //     <CardContent>
    //       <FormControl fullWidth>
    //         <Typography
    //           className={classes.title}
    //           color='textSecondary'
    //           gutterBottom
    //         ></Typography>
    //         <TextField
    //           id='outlined-multiline-static'
    //           label='New Post'
    //           multiline
    //           rows={4}
    //           fullWidth
    //           variant='outlined'
    //           name='postBody'
    //           onChange={(e) => setPostBody(e.target.value)}
    //           value={postBody}
    //           // value={this.state.postBody}
    //           // onChange={handlePostBodyChange}
    //         />
    //         {/* <p>{postBody}</p> */}
    //         <CardActions>
    //           <Button
    //             // onClick={submitPost}
    //             type='submit'
    //             variant='contained'
    //             color='secondary'
    //           >
    //             Submit
    //           </Button>
    //         </CardActions>
    //       </FormControl>
    //     </CardContent>
    // </Card>
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

export default PostForm;
