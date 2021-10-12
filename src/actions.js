/**
 * Contains all the actions that can be done for the redux store
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 10/7/2021
 */
import * as actions from "./actionTypes";

//This is only for testing
export function testAction(description) {
    return {
        type: actions.WelcomeAction,
        payload: {
            description,
        },
        stuff: "something changed",
    };
}

//Not being used
export function setUser(description) {
    return {
        type: actions.setUser,
        payload: {
            description,
        },
    };
}

/**
 *
 * @param {any} description the description of the action
 * @param {any} newName the new name to set the current name to
 * @returns an object holding the new information
 */
export function setUsername(description, newName) {
    return {
        type: actions.replaceUsername,
        payload: {
            description,
        },
        user: {
            username: newName,
        },
    };
}

/**
 * Increments the user's wins and the number of games played
 * @param {any} description the description of the action
 * @returns an object holding the new information
 */
export function incrementWins(description) {
    return {
        type: actions.increaseWins,
        payload: {
            description,
        },
    };
}

/**
 * Increments the user's losses and the number of games played
 * @param {any} description the description of the action
 * @returns an object holding the new information
 */
export function incrementLosses(description) {
    return {
        type: actions.increaseLosses,
        payload: {
            description,
        },
    };
}
