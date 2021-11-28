import { useState } from "react";
import { Container } from "react-bootstrap";
import "../../assets/Game.css";
import Bets from "../Games/Bets";

const WarTemplate = () => {
  const [betsVisible, setBetsVisible] = useState(true);
  const getRandomRotation = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  const cardStyle = (index) => {
    return {
      left: `${1 + index}rem`,
      transform: `rotate(${getRandomRotation(-3, 3)}deg)`,
    };
  };

  const players = [
    {
      id: "Player1",
      bet: 50,
      bank: 1000,
      active: [
        {
          suit: "D",
          rank: "A",
        },
      ],
    },
    {
      id: "Player2",
      bet: 100,
      bank: 1000,
      active: [
        {
          suit: "D",
          rank: "A",
        },
      ],
    },
  ];

  return (
    <>
      <div className="board">
        <div className="board-prompt">
          <p className="h5">Awaiting player bets...</p>
        </div>

        <div className="players">
          {players.map((player, index) => (
            <div className={`board-player board-player-${index}`}>
              <div
                className={`player-cards ${player.status ? player.status : ""}`}
              >
                <img className="war-card-img" src={`/Images/Cards/HH.png`} />
                {player.active.map((card, index) => (
                  <img
                    className="war-card-img"
                    style={cardStyle(index)}
                    src={`/Images/Cards/${card.rank}${card.suit}.png`}
                  />
                ))}
              </div>

              <div className="player-info">
                <div className="player-timer" />
                <p className="player-name">{player.id}</p>
                <p class="player-bank">${player.bank}</p>
                <p class="player-bet">{player.bet}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="dashboard">
          {betsVisible && <Bets setBetsVisible={setBetsVisible} />}
        </div>
      </div>
    </>
  );
};

export default WarTemplate;
