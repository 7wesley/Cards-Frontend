import { useState } from "react";
import "../../assets/Game.css";
import Bets from "../Games/Bets";

const GameTemplatePlayers = () => {
  const profilePictures = false;
  const [betsVisible, setBetsVisible] = useState(true);
  const getRandomRotation = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  const cardStyle = (index) => {
    return {
      left: `${index}rem`,
      transform: `rotate(${getRandomRotation(-3, 3)}deg)`,
    };
  };

  const players = [
    {
      id: "Player1",
      bet: 50,
      bank: 1000,
      cards: [
        {
          suit: "D",
          rank: "A",
        },
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

      cards: [
        {
          suit: "D",
          rank: "A",
        },
        {
          suit: "D",
          rank: "A",
        },
      ],
    },
    {
      id: "Player3",
      bank: 1000,
      bet: 50,
      cards: [
        {
          suit: "D",
          rank: "A",
        },
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
        <div className="board-prompt d-flex flex-column justify-content-center h-100">
          <p className="h5  align-self-center">Awaiting player bets...</p>
        </div>

        <div className="players">
          {players.map((player, index) => (
            <div className={`board-player board-player-${index}`}>
              <div
                className={`player-cards ${player.status ? player.status : ""}`}
              >
                {!profilePictures &&
                  player.cards.map((card, index) => (
                    <img
                      className="card-img"
                      style={cardStyle(index)}
                      src={`/Images/Cards/${card.rank}${card.suit}.png`}
                      alt="Card"
                    />
                  ))}
              </div>
              {profilePictures && (
                <img
                  className="player-pic"
                  src="/Images/blankProfile.png"
                  alt="User profile"
                />
              )}

              <div className="player-info">
                <div className="d-none d-md-block player-timer" />
                <p className="player-name">{player.id}</p>
                <p class="player-bank">${player.bank}</p>
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

export default GameTemplatePlayers;
