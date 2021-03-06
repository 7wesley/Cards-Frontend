import { useEffect, useState, useCallback } from "react";
import "../../assets/Game.css";
import { getSocket } from "../Socket";
import Bets from "./Bets";
import Results from "./Results";
import ChatModal from "../Templates/ChatModal.js";
import { Modal } from "react-bootstrap";

/**
 * Takes information from the server and displays it in a
 * game of War
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 12/12/2021
 */
const War = ({ server, userData, updateStorage }) => {
  const [bank, setBank] = useState(0);
  const [betsVisible, setBetsVisible] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const id = userData && userData.username;
  const myTurn = server.turn === id;

  useEffect(() => {
    if (!server.results && !server.turn) {
      setBetsVisible(true);
    }
  }, [server.results, server.turn]);

  useEffect(() => {
    const myBank = server.players.find((p) => p.id === id).bank;
    setBank(myBank);
  }, [server.players, id]);

  useEffect(() => {
    if (server.chatMsg) {
      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages.push(server.chatMsg);
        return newMessages;
      });
    }
  }, [server.chatMsg, id]);

  /**
   * Closes the ChatModal if the user backs out
   */
  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, [setModalOpen]);

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
      width:
        playerId === server.turn ? `${100 - 5 * (20 - server.timer)}%` : "100%",
    };
  };

  return (
    <>
      <div className="board">
        <div className="board-prompt justify-content-center align-items-center">
          {server.results ? (
            <Results
              userData={userData}
              results={server.results}
              updateStorage={updateStorage}
            />
          ) : (
            !server.turn && <p className="h5">Awaiting player bets...</p>
          )}
        </div>

        <div className="players">
          {server.players.map((player, index) => (
            <div
              className={`board-player board-player-${index} ${
                player.id === server.turn ? "player-turn" : ""
              }`}
            >
              <div className={`player-cards ${player.status && player.status}`}>
                {!!player.deck.length && (
                  <img
                    className="card-img"
                    src={`/Images/Cards/HH.png`}
                    alt="Deck"
                  />
                )}
                {player.cards.map((card, index) => (
                  <img
                    className="card-img"
                    style={cardStyle(index)}
                    src={`/Images/Cards/${card.rank}${card.suit}.png`}
                    alt="Card"
                  />
                ))}
              </div>
              {!player.deck.length && (
                <img
                  className="player-pic"
                  src={player.image}
                  alt="User profile"
                />
              )}
              <div className="player-info">
                <div className="player-timer" style={timerStyle(player.id)} />
                <p className="player-name">
                  {player.id === id ? "You" : player.id}
                </p>
                {!!player.bank && <p className="player-bank">${player.bank}</p>}
              </div>
              <p className={"bet " + (!!player.bet && "player-bet")}>
                {!!player.bet && player.bet}
              </p>
            </div>
          ))}
        </div>
        <div className="dashboard">
          {betsVisible ? (
            <Bets
              setBetsVisible={setBetsVisible}
              id={id}
              timer={server.timer}
              bank={bank}
            />
          ) : (
            <div className="row d-flex justify-content-center mt-5 text-center">
              <button
                className="choice-button mx-2 button-symbol chat"
                onClick={() => setModalOpen(true)}
              >
                Chat
              </button>
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
            </div>
          )}
        </div>
      </div>

      <Modal data-cy="chatModal" show={modalOpen} onHide={closeModal}>
        <ChatModal
          closeModal={closeModal}
          messages={messages}
          setMessages={setMessages}
          id={id}
        />
      </Modal>
    </>
  );
};

export default War;
