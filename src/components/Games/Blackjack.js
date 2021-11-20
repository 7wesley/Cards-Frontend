import { useEffect } from "react";
import "../../assets/Game.css";
import { getSocket } from "../Socket";

const Blackjack = ({ players, turn, timer, id }) => {
  const myTurn = turn === id;
  useEffect(() => {
    console.log(players);
  });

  const handlePlay = (choice) => {
    getSocket().emit("player-move", choice);
  };

  const getRandomRotation = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  const cardStyle = (index) => {
    return {
      left: `${index}rem`,
      transform: `rotate(${getRandomRotation(-3, 3)}deg)`,
    };
  };

  return (
    <>
      <div className="board">
        <div className="players">
          {players.map((player, index) => (
            <div
              className={`board-player board-player-${index} ${
                player.id === turn ? " player-turn" : ""
              }`}
            >
              <div
                className={`player-cards ${player.status && player.status}`}
              >
                {player.cards.map((card, index) => (
                  <img
                    className="blackjack-card-img"
                    style={cardStyle(index)}
                    src={`/Images/Cards/${card.rank}${card.suit}.png`}
                  />
                ))}
              </div>

              <div className="player-info">
                <div
                  className="player-timer"
                  style={{
                    width: player.id === turn && `${100 - 5 * (20 - timer)}%`,
                  }}
                />
                <p className="player-name">{player.id}</p>
                <p class="player-bet">${player.bet}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="dashboard">
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
        </div>
      </div>
    </>
  );
};

export default Blackjack;
