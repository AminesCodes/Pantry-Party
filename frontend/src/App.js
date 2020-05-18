import React, { useState } from "react";
import { Route, Switch, withRouter, useHistory } from "react-router-dom";
import axios from 'axios';
import Error from "./Components/Error";
import AuthContainer from "./containers/AuthContainer";
import Users from "./Components/users/Users";
import UserDashboard from './Components/users/UserDashboard'
import UserPublic from './Components/users/UserPublic';
import SingleRecipe from "./Components/recipes/SingleRecipe";
import NavBar from './Components/Nav'
import Settings from "./Components/users/Settings";
import NewRecipe from './Components/recipes/NewRecipe';


const App = () => {

  const [username, setUsername] = useState("")
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState({ user: null })

  const history = useHistory();

  const checkUserLoggedIn = async () => {
    try {
      let response = await axios.get('/auth/isUserLoggedIn')
    } catch (error) {
      console.log('err:', error)
    }
  }

  const logoutUser = async () => {
    try {
      await axios.get('/auth/logout')
      console.log('logout clicked')
      setUser(null)
      setLoggedIn(false)
      history.push('/login') // redirect user to login page
    } catch (error) {
      console.log('err:', error)
    }
  }

  return (
    <div className="App">
      <NavBar
        logoutUser={logoutUser}
        isLoggedIn={isLoggedIn}
      />

      <Switch>
        <Route exact path="/signup" >
          <AuthContainer
            username={username}
            firstname={firstname}
            lastname={lastname}
            password={password}
            email={email}
            user={user}
            isLoggedIn={isLoggedIn}
            setUsername={setUsername}
            setFirstname={setFirstname}
            setLastname={setLastname}
            setEmail={setEmail}
            setPassword={setPassword}
            setLoggedIn={setLoggedIn}
            setUser={setUser}
          />
        </Route>

        <Route exact path="/login" >
          <AuthContainer
            username={username}
            password={password}
            user={user}
            isLoggedIn={isLoggedIn}
            setUsername={setUsername}
            setPassword={setPassword}
            setLoggedIn={setLoggedIn}
            setUser={setUser}
          />
        </Route>

        <Route exact path='/home'>
          <UserDashboard
            user={user}
          />
        </Route>

        <Route exact path='/users' component={Users} />
        <Route exact path='/profile'>
          <UserPublic
            user={user}
          />
        </Route>
        <Route exact path ='/settings'>
          <Settings
          user={user}
           />
        </Route>
        <Route path='/recipe/add'>
          <NewRecipe user={user} />
        </Route>
        {/* <Route exact path='/singlerecipe' component={SingleRecipe} /> */}
        <Route exact path='/recipe/:recipeId' component={SingleRecipe} />

        <Route exact path='/logout'></Route>
        <Route path="*" render={() => <Error />} />
      </Switch>

    </div>
  );
}


export default withRouter(App);
