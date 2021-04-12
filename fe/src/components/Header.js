import React from "react";
import { makeStyles, Paper, Tabs, Tab } from "@material-ui/core";

function Header() {
  const useStyles = makeStyles({
    root: {
      flexGrow: 1,
    },
  });

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor='primary'
        textColor='primary'
        centered
      >
        <Tab label='REST' />
        <Tab label='GraphQL' />
      </Tabs>
    </Paper>
  );
}

export default Header;
