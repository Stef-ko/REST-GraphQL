import "./App.css";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

import Header from "./components/Header";
import GraphQL from "./components/GraphQL";
import Rest from "./components/Rest";

function App() {
  return (
    <>
      <Router>
        <Header history />;
        <Route exact path='/rest' component={Rest} />
        <Route exact path='/graphql' component={GraphQL} />
        <Route exact path='/'>
          <Redirect to='/graphql' />
        </Route>
      </Router>
    </>
  );
}

export default App;
