import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import ListingPage from './components/ListingPage/ListingPage';
import DetailsPage from './components/DetailsPage/DetailsPage';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/details/:itemName" component={DetailsPage} />
        <Route exact path="/" component={ListingPage} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
