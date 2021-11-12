import { Container } from "react-bootstrap";
import "../../assets/Game.css";

const GameTemplate = () => {
  return (
    <div className="board">
      <Container className="gameContainer">
        <div className="board-player board-player-empty board-player-0">
          <p className="position-number">1</p>
        </div>
        <div className="board-player board-player-empty board-player-1">
          <p className="position-number">2</p>
        </div>
        <div className="board-player board-player-empty board-player-2">
          <p className="position-number">3</p>
        </div>
        <div className="board-player board-player-empty board-player-3">
          <p className="position-number">4</p>
        </div>
        <div className="board-player board-player-empty board-player-4">
          <p className="position-number">5</p>
        </div>
        <div className="board-player board-player-empty board-player-5">
          <p className="position-number">6</p>
        </div>
        <div className="board-player board-player-empty board-player-6">
          <p className="position-number">7</p>
        </div>
        <div className="board-player board-player-empty board-player-7">
          <p className="position-number">8</p>
        </div>
        <div className="board-player board-player-empty board-player-8">
          <p className="position-number">9</p>
        </div>
        <div className="board-player board-player-empty board-player-9">
          <p className="position-number">10</p>
        </div>
      </Container>
    </div>
  );
};

export default GameTemplate;
