import { useEffect, useState } from "react";
import "../../assets/Game.css";
import { getSocket } from "../Socket";
import Bets from "./Bets";
import Winners from "./Winners";

const Blackjack = ({
  userData,
  players,
  turn,
  timer,
  winners,
  updateStorage,
}) => {
  const [betsVisible, setBetsVisible] = useState(true);
  const id = userData && userData.username;
  const myTurn = turn === id;

  useEffect(() => {
    console.log(players);
  });

  const handlePlay = (choice) => {
    getSocket().emit("player-move", choice);
  };

  const cardStyle = (index) => {
    return {
      left: `${index}rem`,
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
          {winners ? (
            <Winners
              userData={userData}
              winners={winners}
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
                {player.cards.map((card, index) => (
                  <img
                    className="blackjack-card-img"
                    style={cardStyle(index)}
                    src={`/Images/Cards/${card.rank}${card.suit}.png`}
                  />
                ))}
              </div>

              <div className="player-info">
                <div className="player-timer" style={timerStyle(player.id)} />
                <p className="player-name">{player.id}</p>
                <p class="player-bet">${player.bet}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="dashboard">
          {betsVisible ? (
            <Bets setBetsVisible={setBetsVisible} id={id} timer={timer} />
          ) : (
            <div className="row d-flex justify-content-center mt-5 text-center">
              <button
                disabled={!myTurn}
                className={`choice-button mx-2 button-symbol hit${
                  !myTurn ? " disabled" : ""
                }`}
                onClick={() => handlePlay("draw")}
              >
                Hit
              </button>
              <button
                disabled={!myTurn}
                className={`choice-button mx-2 button-symbol stand${
                  !myTurn ? " disabled" : ""
                }`}
                onClick={() => handlePlay("stand")}
              >
                Stand
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Blackjack;
