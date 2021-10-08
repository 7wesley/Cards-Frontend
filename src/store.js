/**
 * Holds the store that will manage the states of the components
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 10/7/2021
 */
import { composeWithDevTools } from 'redux-devtools-extension';
import {createStore, applyMiddleware} from "redux"
import {logger} from "redux-logger"
import * as actions from "./actionTypes"


//Creates an array that holds 3 objects and 3 fields
//The 3 fields are id, name, and age
const PersonDetails = [
    {id: 1, name: "Kyle", age: 23},
    {id: 2, name: "Taylor", age: 45},
    {id: 3, name: "Anna", age: 30}
]

//This converts the objects that holds these 3 fields into an object 
//  that only holds the name field
const PersonNames = PersonDetails.map(person => person.name);

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

const initialState = {
    
    welcome: {
        id: "welcome"
    }, 
    payload: {
        description: "null"
    }

    // css:{name: "name1"},
    // items:[
    //     {name:"name2"},
    //     {name:"name3"},
    //     {name:"name3"}]
}


//Create the reducer
//A reducer is a function that takes the current state and returns a new state.
//You have to create the reducer before the store because it is needed for creating the store
//An action is like an event that describes something that happened to the application. They contain
//  the smallest amount of data needed to describe what happened
const reducer = (state = initialState, action) => {

    //Action.type is viewed to see if an update is needed
    switch(action.type) {
        case actions.WelcomeAction:
            return {...state, 
                payload: {
                    description: "Run"
                }
            }
            // return Object.keys(state.welcome).map(state2 => state2.id !== action.payload.id ? 
            //     state : {...state, resolved: true})    
        
            
            // case "Obj_2_State":
            // return state.map(state2 => state2.id !== action.payload.id ? 
            //     state2 : {...state2, resolved: true})
        default:
            return state
    }
}
  
//Creates the store
//The store holds the values of state
export const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(logger)
));

//This is called everytime the store changes
//Call unsubscribe() to not be notified when the store changes
const unsubscribe = store.subscribe(() => {
    console.log("Store changed!", store.getState())
})

