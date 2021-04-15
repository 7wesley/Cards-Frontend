import React, { useState, useEffect } from 'react';
import Header from './Templates/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Contact from './Information/Contact';
import About from './Information/About';
import Welcome from './Information/Welcome';
import Games from './Games/Games'
import GameRoom from "./Games/GameRoom";
import Waiting from "./Games/Waiting";
import Stats from './Information/Stats';
import Login from './Account/Login';
import Signup from './Account/Signup';
import Account from './Account/Account';
import Layout from './Games/Layout';
import useStorage from '../hooks/useStorage'

const Routing = () => {

    const { result, setValue } = useStorage('username', Math.round(Math.random() * 100000));
    //const { stats } = useQuerySessionAndDB('stats', {}, currentUser);

    return (
        <Router>      
            <Header name = {result}/>
            <Switch>
                <Route exact path = "/" component = {Welcome} />
                <Route exact path = "/games" 
                    render ={() => (
                    <Games id = {result} />)}
                />
                <Route exact path = "/games/:roomId" render ={(props) => (
                    <GameRoom {...props} id = {result}
                    />
                )}/>
                <Route path = "/about" component = {About} />
                <Route path = "/contact" component = {Contact} />
                <Route path = "/waiting" component = {Waiting}/>
                <Route path = "/stats" render = {() => (
                    <Stats id = {result} />
                )}/>
                <Route path = "/account" render = {() => (
                    <Account id = {result} setValue = {setValue}/>
                )}/>
                <Route path = "/login" component = {Login} />
                <Route path = "/signup" component = {Signup} />
                <Route path = "/layout" component = {Layout} />
            </Switch>
        </Router>
    )
}

export default Routing;