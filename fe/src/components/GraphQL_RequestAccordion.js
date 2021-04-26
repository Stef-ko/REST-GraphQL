import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Card,
  CardContent,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

function GraphQLRequestAccordion({ posts }) {
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <h3>Get Posts</h3>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h4>Request</h4>

              <Card elevation={2}>
                <CardContent>
                  <p>
                    URL:{" "}
                    <a href='http://localhost:5000/'>
                      <code>http://localhost:5000/</code>
                    </a>
                    <br />
                    <br />
                    Method: <code>POST</code>
                    <br />
                    <br />
                    <code>
                      query {"{"}
                      <br />
                      &nbsp; getPosts {"{"}
                      <br />
                      &nbsp; &nbsp; id
                      <br />
                      &nbsp; &nbsp; body
                      <br />
                      &nbsp; &nbsp; createdAt
                      <br />
                      &nbsp; {"}"}
                      <br />
                      {"}"};
                    </code>
                  </p>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <h4>Response</h4>
              <Card elevation={2}>
                <CardContent>
                  <code>
                    <pre>{JSON.stringify(posts, null, 2)}</pre>
                  </code>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default GraphQLRequestAccordion;
