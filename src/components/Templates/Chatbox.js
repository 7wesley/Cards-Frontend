/**
 * Creates a chatbox that allows users to enter text
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 5/13/2021
 */

/**
 * A chatbox that players will eventually be able to use to communicate with each other
 * @param {any} handleChat for finding if the chat can be open or not
 * @returns the chatbox that has been created
 */
const Chatbox = ({ handleChat }) => {
  return (
    <div id="chatBox" className="sidebar">
      <a href="/null" className="closebtn" onClick={handleChat}>
        &times;
      </a>
      <h3 className="text-center text-light"> Chat </h3>
      <div className="sendMessage ml-2 mr-2">
        <form>
          <div className="form-group">
            <p className="text-light p-2"> Enter message here </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chatbox;
