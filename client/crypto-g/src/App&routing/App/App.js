import React, {useEffect} from 'react';
import {MainComponent} from './App.style'
import {MainPage} from "../../pages/mainPage/mainPage";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import {UserPage} from "../../pages/userPage/userPage";
import {NoMatChUrl} from "../../pages/404/404";
import JwtCheckingStore from "../../store/jwtChecking/jwtChecking.store"

function App() {

    useEffect(async () => {
        try {
          const userDataStorage = localStorage.getItem('rememberMe')
          const parsData = JSON.parse(userDataStorage)
          await JwtCheckingStore.addResponseToJwtCheckingStore(parsData)

        } catch (e) {
            throw new Error(e)
        }
    }, [])

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