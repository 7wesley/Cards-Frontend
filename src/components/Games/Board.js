import { useEffect } from "react";
import { Container } from "react-bootstrap";
import useSocketListener from "../../hooks/useSocketListener";

const Board = ({ players, prompt, turn, timer, message }) => {
  useEffect(() => {});

  return (
    <div className="board">
      <Container className="gameContainer">
        <div className="table">
          {players.map((player, index) => {
            <div
              className={"table-player table-player-seat table-player-" + index}
            >
              <div className="player-cards"></div>
            </div>;
          })}
        </div>
      </Container>
    </div>
  );
};

export default Board;
