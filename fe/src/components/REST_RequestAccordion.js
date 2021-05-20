import {
  Grid,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

function RESTRequestAccordion({ posts }) {
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          {/* <h3>{request.Request}</h3> */}
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h4>Request</h4>

              <Card elevation={2}>
                <CardContent>
                  <p>
                    <b>URL: </b>
                    {/* <a href={request.RequestURL}>
                      <code>{request.RequestURL}</code>
                    </a> */}
                    <br />
                    <br />
                    {/* <b>Method:</b> <code>{request.RequestMethod}</code> */}
                    <br />
                    <br />
                    <b>Body:</b>
                  </p>
                  <code>{/* <pre>{request.RequestBody}</pre> */}</code>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <h4>Response</h4>
              <Card elevation={2}>
                <CardContent>
                  <code>{/* <pre>{request.Response}</pre> */}</code>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default RESTRequestAccordion;
