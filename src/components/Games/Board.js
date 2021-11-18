import { useEffect } from "react";
import { Container } from "react-bootstrap";
import "../../assets/Game.css";

const Board = ({ players, prompt, turn, timer, message, id }) => {
  useEffect(() => {
    console.log(players);
  });

  return (
    <>
      <div className="board">
        <div className="players">
          {players.map((player, index) => (
            <div
              className={`board-player board-player-${index} ${
                player.id === turn && " player-turn"
              }`}
            >
              <div className="player-cards">
                {player.cards.map((card, index) => (
                  <div className={"card-container card-" + index}>
                    <img
                      className="card-img"
                      src={`/Images/Cards/${card.rank}${card.suit}.png`}
                    />
                  </div>
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
            <button className="choice-button mx-2 button-symbol hit">
              Hit
            </button>
            <button className="choice-button mx-2 button-symbol stand">
              Stand
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Board;
