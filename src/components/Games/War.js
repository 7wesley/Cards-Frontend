import { useEffect, useState, useCallback } from "react";
import "../../assets/Game.css";
import { getSocket } from "../Socket";
import Bets from "./Bets";
import Results from "./Results";
import ChatModal from "../Templates/ChatModal.js";
import { Modal } from "react-bootstrap";

const War = ({ userData, players, turn, timer, results, updateStorage }) => {
  const [bank, setBank] = useState(0);
  const [betsVisible, setBetsVisible] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [chatMsgs, setChatMsgs] = useState([]);

  const id = userData && userData.username;
  const myTurn = turn === id;

  const addChatMsg = async (msg) => {
    chatMsgs.push(msg);
    getSocket().emit("send-message", msg);
  };

  let [socket, setSocket] = useState(null);
  useEffect(() => setSocket(getSocket()));

  /**
   * Handles what happens when the server sends an update to the
   *  chat messages
   */
  useEffect(() => {
    if (!socket) return;
    socket.on(
      "updateChat",
      (chat) => {
        try {
          //Update this user's chat messages
          setChatMsgs(chat);
        } catch (err) {
          console.log(err);
        }
      },
      [socket]
    );
  });

  useEffect(() => {
    if (!results && !turn) {
      setBetsVisible(true);
    }
  }, [results, turn]);

  useEffect(() => {
    console.log(players);
    const myBank = players.find((p) => p.id === id).bank;
    setBank(myBank);
  }, [players, id]);

  /**
   * Closes the ChatModal if the user backs out
   */
  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, [setModalOpen]);

  /**
   * Handles opening the chat modal
   */
  const handleChat = () => {
    setModalOpen(true);
  };

  const handlePlay = (choice) => {
    getSocket().emit("player-move", choice);
  };

  const cardStyle = (index) => {
    return {
      left: `${1 + index}rem`,
      transform: `rotate(${index}deg)`,
    };
  };

  const timerStyle = (playerId) => {
    return {
      width: playerId === turn ? `${100 - 5 * (20 - timer)}%` : "100%",
    };
  };

  return (
    <>
      <div className="board">
        <div className={"board-prompt"}>
          {results ? (
            <Results
              userData={userData}
              results={results}
              updateStorage={updateStorage}
            />
          ) : (
            !turn && <p className="h5">Awaiting player bets...</p>
          )}
        </div>

        <div className="players">
          {players.map((player, index) => (
            <div
              className={`board-player board-player-${index} ${
                player.id === turn ? " player-turn" : ""
              }`}
            >
              <div className={`player-cards ${player.status && player.status}`}>
                <img className="war-card-img" src={`/Images/Cards/HH.png`} />
                {player.cards.map((card, index) => (
                  <img
                    className="war-card-img"
                    style={cardStyle(index)}
                    src={`/Images/Cards/${card.rank}${card.suit}.png`}
                  />
                ))}
              </div>

              <div className="player-info">
                <div className="player-timer" style={timerStyle(player.id)} />
                <p className="player-name">
                  {player.id === id ? "You" : player.id}
                </p>
                {!!player.bank && <p className="player-bank">${player.bank}</p>}

                <p className={"bet " + (!!player.bet && "player-bet")}>
                  {!!player.bet && player.bet}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="dashboard">
          {betsVisible ? (
            <Bets
              setBetsVisible={setBetsVisible}
              id={id}
              timer={timer}
              bank={bank}
              setModalOpen={setModalOpen}
            />
          ) : (
            <div className="row d-flex justify-content-center mt-5 text-center">
              <button
                disabled={!myTurn}
                className={`choice-button mx-2 button-symbol play${
                  !myTurn ? " disabled" : ""
                }`}
                onClick={() => handlePlay("draw")}
              >
                Play
              </button>
              <button
                disabled={!myTurn}
                className={`choice-button mx-2 button-symbol forfeit${
                  !myTurn ? " disabled" : ""
                }`}
                onClick={() => handlePlay("forfeit")}
              >
                Forfeit
              </button>
              <button
                className="choice-button mx-2 button-symbol"
                onClick={() => handleChat()}
              >
                Chat
              </button>
            </div>
          )}
        </div>
      </div>

      {/*The Modal that handles the Chat among the players in the game*/}
      <Modal data-cy="ChatModal" show={modalOpen} onHide={closeModal}>
        <ChatModal
          closeModal={closeModal}
          chatMsgs={chatMsgs}
          addChatMsg={addChatMsg}
          id={id}
        />
      </Modal>
    </>
  );
};

export default War;
