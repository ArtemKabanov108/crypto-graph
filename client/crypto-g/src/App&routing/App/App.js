import React, {useEffect} from 'react';
import {MainComponent} from './App.style'
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import {NoMatChUrl} from "../../pages/404/404";
import JwtCheckingStore from "../../store/jwtChecking/jwtChecking.store"
import {Redirect} from "react-router";
import GlobalStore from "../../store/GlobalStore/global.store";
import {observer} from "mobx-react-lite";
import {MainPage} from "../../pages/mainPage/mainPage";
import {UserPage} from "../../pages/userPage/userPage";

const App = observer( () => {
    const isAuthed = !!GlobalStore.globalStorageForAuth?.nickName
  return (
      <Router>
          <MainComponent>
              <Switch>
                  <Route exact path="/user"  >
                      {!isAuthed ? <Redirect to="/" /> : <UserPage /> }
                  </Route>
                  <Route path="/user/*" component={NoMatChUrl} />
                  <Route path="/" >
                      {isAuthed ? <Redirect to="/user" /> : <MainPage />}
                  </Route>
                  {/*<Route path="/forgotPassword">*/}
                  {/*    <ForgotPasswordPage />*/}
                  {/*</Route>*/}
              </Switch>
          </MainComponent>
      </Router>
  );
})

export default App;