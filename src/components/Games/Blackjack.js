import { useEffect, useState } from "react";
import "../../assets/Game.css";
import { getSocket } from "../Socket";
import Bets from "./Bets";
import Results from "./Results";

const Blackjack = ({
  userData,
  players,
  turn,
  timer,
  results,
  updateStorage,
}) => {
  const [bank, setBank] = useState(0);
  const [betsVisible, setBetsVisible] = useState(true);
  const id = userData && userData.username;
  const myTurn = turn === id;

  useEffect(() => {
    if (!results && !turn) {
      setBetsVisible(true);
    }
  }, [results, turn]);

  useEffect(() => {
    const myBank = players.find((p) => p.id === id).bank;
    setBank(myBank);
  }, [players, id]);

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
            />
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
