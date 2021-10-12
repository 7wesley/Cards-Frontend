/**
 * Holds the store that will manage the states of the components
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 10/7/2021
 */
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import { logger } from "redux-logger";
import * as actionTypes from "./actionTypes";

//Creates an array that holds 3 objects and 3 fields
//The 3 fields are id, name, and age
/*
const PersonDetails = [
    {id: 1, name: "Kyle", age: 23},
    {id: 2, name: "Taylor", age: 45},
    {id: 3, name: "Anna", age: 30}
]
*/
//This converts the objects that holds these 3 fields into an object
//  that only holds the name field
//const PersonNames = PersonDetails.map(person => person.name);

// const initialState = [
//     {
//         type: null,
//         payload: {
//             description: "null"
//         }
//     },
//     {
//         pk:23,
//         order: 2,
//         label: 'Caption link color',
//         css_identifier: '.caption-link',
//         css_attribute: 'color',
//         css_value: '#FEFEFE'
//     }
// ];

//const name = 'Guest-'+Math.round(Math.random() * 100000)

const initialState = {
  welcome: {
    id: "welcome",
  },
  payload: {
    description: "null",
  },

  user: {
    username: `Guest-${Math.round(Math.random() * 100000)}`,
    stats: {
      Wins: 0,
      Losses: 0,
      Played: 0,
    },
  },

  // css:{name: "name1"},
  // items:[
  //     {name:"name2"},
  //     {name:"name3"},
  //     {name:"name3"}]
};

//Create the reducer
//A reducer is a function that takes the current state and returns a new state.
//You have to create the reducer before the store because it is needed for creating the store
//An action is like an event that describes something that happened to the application. They contain
//  the smallest amount of data needed to describe what happened
const reducer = (state = initialState, action) => {
  //Action.type is viewed to see if an update is needed
  switch (action.type) {
    // A test case for the reducer
    case actionTypes.WelcomeAction:
      return {
        ...state,

        payload: action.payload,
      };
    // return Object.keys(state.welcome).map(state2 => state2.id !== action.payload.id ?
    //     state : {...state, resolved: true})

    // case "Obj_2_State":
    // return state.map(state2 => state2.id !== action.payload.id ?
    //     state2 : {...state2, resolved: true})

    // Initializes the user (for testing)
    case actionTypes.setUser:
      return {
        ...state,

        payload: action.payload,
        user: action.user,
      };

    // updates the store's state when the user wants to change their username
    case actionTypes.replaceUsername:
      return {
        ...state,
        payload: action.payload,

        user: {
          username: action.user.username,
          stats: state.user.stats,
        },
      };

    //Updates the state for when a user wins a game
    case actionTypes.increaseWins:
      return {
        ...state,
        user: {
          stats: {
            Wins: state.user.stats.Wins + 1,
            Losses: state.user.stats.Losses,
            Played: state.user.stats.Played + 1,
          },
        },
      };

    //Updates the state for when a user losses a game
    /*
        case actionTypes.increaseWins:
            return {...state, 
                user: {
                    stats: {
                        Wins: state.user.stats.Wins,
                        Losses: state.user.stats.Losses+1,
                        Played: state.user.stats.Played+1
                    }
                }  
            }
        */
    default:
      return state;
  }
};

//Creates the store
//The store holds the values of state
export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(logger))
);

//This is called everytime the store changes
//Call unsubscribe() to not be notified when the store changes
/*
const unsubscribe = store.subscribe(() => {
    console.log("Store changed!", store.getState())
})
*/
