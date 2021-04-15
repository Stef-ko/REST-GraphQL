import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import { makeStyles } from "@material-ui/core/styles";

import { TextField } from "@material-ui/core";

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

    return (
    
        <Card className={classes.root}>
            <CardHeader
                avatar={<Avatar aria-label='recipe'>S</Avatar>}
                title='User Name'
                subheader=''
            />
            <CardContent>
                <Typography
                    className={classes.title}
                    color='textSecondary'
                    gutterBottom
                ></Typography>
                <TextField
                    id='outlined-multiline-static'
                    label='New Post'
                    multiline
                    rows={4}
                    fullWidth
                    variant='outlined'
                />
                <CardActions>
                    <Button type='submit' variant='contained' color='secondary'>
                        Submit
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    )
}
export default PostForm;