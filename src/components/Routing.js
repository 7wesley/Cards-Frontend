import React from "react";
import Header from "./Templates/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Contact from "./Information/Contact";
import About from "./Information/About";
import Welcome from "./Information/Welcome";
import Games from "./Games/Games";
import GameRoom from "./Games/GameRoom";
import Waiting from "./Games/Waiting";
import Stats from "./Information/Stats";
import Tutorial from "./Information/Tutorial";
import Login from "./Account/Login";
import Signup from "./Account/Signup";
import Account from "./Account/Account";
import useStorage from "../hooks/useStorage";
import Template from "./Templates/GameTemplate";
import GameTemplatePlayers from "./Templates/GameTemplatePlayers";

/**
 * Routes the user to their desired page
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 12/12/2021
 */
const Routing = () => {
  const { userData, updateStorage } = useStorage({
    username: `Guest${Math.round(Math.random() * 10000)}`,
    stats: { Wins: 0, Losses: 0, Played: 0 },
  });
  const id = userData && userData.username;

  return (
    <Router>
      <Header id={id} />
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route exact path="/games" render={() => <Games id={id} />} />
        <Route
          exact
          path="/games/:roomId"
          render={(props) => (
            <GameRoom
              {...props}
              userData={userData}
              updateStorage={updateStorage}
            />
          )}
        />
        <Route path="/template" component={Template} />
        <Route path="/templatePlayers" component={GameTemplatePlayers} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/waiting" component={Waiting} />
        <Route path="/tutorial" component={Tutorial} />
        <Route path="/stats" render={() => <Stats userData={userData} />} />
        <Route
          path="/account"
          render={() => <Account id={id} updateStorage={updateStorage} />}
        />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </Router>
  );
};

export default Routing;
