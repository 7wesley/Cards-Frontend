/**
 * Handles how the user transitions between webpages
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 5/13/2021
 */

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
import {connect} from "react-redux"
import { setUser } from "../actions";
import {store} from "../store.js"



import useStorage from "../hooks/useStorage";

/**
 * Handles how the user is able to switch between pages
 * @returns this class's routing method
 */
const Routing = () => {

    
    const { userData, updateStorage } = useStorage({
        username: `Guest-${Math.round(Math.random() * 100000)}`,
        stats: { Wins: 0, Losses: 0, Played: 0 },
    });

    // const id = userData && userData.username;
    const id = store.getState().user.username

    // const action3 = {
    //     user: userData,
    //     type: actions.setUser, 
    //     payload: {
    //         description: "Initialized the user"
    //     }, 
    // }



    

    return (
        <Router>
            <Header id={id}/>
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
                <Route path="/about" component={About} />
                <Route path="/contact" component={Contact} />
                <Route path="/waiting" component={Waiting} />
                <Route path="/tutorial" component={Tutorial} />
                <Route
                    path="/stats"
                    render={() => <Stats /*userData={userData}*/ />}
                />
                <Route
                    path="/account"
                    render={() => (
                        <Account /**id={id} updateStorage={updateStorage}**/ />
                    )}
                />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
            </Switch>
        </Router>
    );
};

//Any time the store is updated, this function is called for this component
const mapStateToProps = state => {
    return {...state, 
        user: {
            username: "new name"
        }} 
    // {
    //     stateValue: state
    //   }  
}
  
  
//Makes a call to the reducer so that it can tell the store to update state
//This function is called whenever this component receives new props
const mapDispatchToProps = dispatch => {
    return {
        // modifyState: (username1) => dispatch(setUser("Clicked something on Routing page"), {...store.getState(), 
        //     username: username1,
        //     stats: {
        //         wins: 0,
        //         losses: 0,
        //         played: 0
        //     }
        // })   
        modifyState: () => dispatch(setUser("Clicked something on Routing page"))   
    }
}



//Connects this App component with the Redux store. 
//exports the App object with the values from te store
export default connect(mapStateToProps, mapDispatchToProps) (Routing);