/**
 * Contains all the actions that can be done for the redux store
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 10/7/2021
 */
import * as actions from "./actionTypes"



export function action1(description) {
    return {
        type: actions.WelcomeAction, 
        payload: {
            description
        }
    }
}