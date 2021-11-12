import { Container } from "react-bootstrap";
import "../../assets/Game.css";

const GameTemplatePlayers = () => {
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
    <div className="board">
      <Container className="gameContainer">
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
              <p className="player-name">{player.id}</p>
              <p class="player-bet">${player.bet}</p>
            </div>
          </div>
        ))}
      </Container>
    </div>
  );
};

export default GameTemplatePlayers;
