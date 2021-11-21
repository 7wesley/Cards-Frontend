import { useState } from "react";
import { Container } from "react-bootstrap";
import "../../assets/Game.css";
import Bets from "../Games/Bets";

const GameTemplatePlayers = () => {
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
      bet: 15,
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
      bet: 20,
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
      bet: 21,
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
        <div className="players">
          {players.map((player, index) => (
            <div className={`board-player board-player-${index}`}>
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
                <div className="player-timer" />
                <p className="player-name">{player.id}</p>
                <p class="player-bet">${player.bet}</p>
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
