/**
 * Contains all the actions that can be done for the redux store
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 10/7/2021
 */
import * as actions from "./actionTypes"



export function testAction(description) {
    return {
        type: actions.WelcomeAction, 
        payload: {
            description
        },
        stuff: "someygbhk"
    }
}


//Not being used
export function setUser(description) {
    return {
        type: actions.setUser, 
        payload: {
            description
        }
    }
}



