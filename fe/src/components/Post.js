import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { CardContent, IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import CommentIcon from "@material-ui/icons/Comment";
import DeleteIcon from "@material-ui/icons/Delete";
import moment from "moment";

function Post({ post: { body, createdAt } }) {
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

  const classes = useStyles();
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
        <Typography variant='body2' component='p'>
          {body}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton color='secondary' aria-label='like post'>
          <FavoriteBorderIcon />
        </IconButton>{" "}
        <IconButton color='secondary' aria-label='like post'>
          <CommentIcon />
        </IconButton>
        <IconButton
          variant='outlined'
          edge='end'
          color='secondary'
          aria-label='like post'
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default Post;
