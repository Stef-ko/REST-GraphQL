import "./App.css";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import GraphQLRequeststore from "./Store/GraphQL_Request_Store";

import Header from "./components/Header";
import GraphQL from "./components/GraphQL_Page";
import Rest from "./components/REST_Page";

function App() {
  return (
    <>
      <Router>
        <Header history />;
        <Route exact path='/rest' component={Rest} />
        <GraphQLRequeststore>
          <Route exact path='/graphql' component={GraphQL} />
          <Route exact path='/'>
            <Redirect to='/graphql' />
          </Route>
        </GraphQLRequeststore>
      </Router>
    </>
  );
}

export default App;
