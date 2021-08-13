import React from 'react';
import {MainComponent} from './App.style'
import {MainPage} from "../../pages/mainPage/mainPage";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import {UserPage} from "../../pages/userPage/userPage";
import {NoMatChUrl} from "../../pages/404/404";

function App() {
  return (
      <Router>
          <MainComponent>
              <Switch>
                  <Route exact path="/user" component={UserPage} />
                  <Route path="/user/*" component={NoMatChUrl} />
                  <Route path="/" component={MainPage} />
                  {/*<Route path="/forgotPassword">*/}
                  {/*    <ForgotPasswordPage />*/}
                  {/*</Route>*/}
              </Switch>
          </MainComponent>
      </Router>
  );
}

export default App;