import { Container } from "react-bootstrap";
import "../../assets/Game.css";

const GameTemplatePlayers = () => {
  const style = {
    width: `${100 / 2}%`,
  };

  const players = [
    {
      id: "Player1",
      bet: 15,
      cards: [
        {
          Suit: "D",
          Rank: "A",
        },
        {
          Suit: "D",
          Rank: "A",
        },
      ],
    },
    {
      id: "Player2",
      bet: 20,
      cards: [
        {
          Suit: "D",
          Rank: "A",
        },
        {
          Suit: "D",
          Rank: "A",
        },
      ],
    },
    {
      id: "Player3",
      bet: 21,
      cards: [
        {
          Suit: "D",
          Rank: "A",
        },
        {
          Suit: "D",
          Rank: "A",
        },
      ],
    },
  ];

  return (
    <>
      <div className="board">
        <div className="players">
          {players.map((player, index) => (
            <div className={"board-player board-player-" + index}>
              <div className="player-cards">
                {player.cards.map((card, index) => (
                  <div className={"card-container card-" + index}>
                    <img
                      className="card-img"
                      src={`/Images/Cards/${card.Rank}${card.Suit}.png`}
                    />
                  </div>
                ))}
              </div>

              <div className="player-info">
                <div className="player-timer" style={style} />
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

export default GameTemplatePlayers;
