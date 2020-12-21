import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Header from './Components/Common/Header';
import Shops from "./Containers/Shops";
import ShopDetails from "./Containers/ShopDetails";
import NotFoundScreen from "./Containers/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Header/>
        <Switch>
          <Route exact path="/">
            <Redirect to="/stores" />
          </Route>
          <Route exact path="/stores" component={Shops} />
          <Route exact path="/stores/:id" component={ShopDetails} />
          <Route component={NotFoundScreen} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
