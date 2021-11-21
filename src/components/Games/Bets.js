import { useRef, useState } from "react";
import { getSocket } from "../Socket";

const Bets = ({ setBetsVisible }) => {
  const [bet, setBet] = useState("");

  const activateCustomInput = () => {
    setBet("custom");
    //Check if input has already been created
    if (!document.getElementById("custom-input")) {
      const button = document.getElementById("customButton");
      button.innerHTML = "";

      //Creating input elements
      const input = document.createElement("input");
      input.className = "custom-form";
      input.id = "custom-input";
      input.type = "text";
      input.maxLength = 5;
      input.autocomplete = "off";
      button.appendChild(input);
      //Focusing on input and disabling button click
      input.focus();
    }
  };

  const handleSubmit = () => {
    let betChosen;
    if (bet === "custom") {
      const customInput = document.getElementById("custom-input").value;
      if (/[0-9]*/.test(customInput)) {
        betChosen = customInput;
      } else {
        betChosen = 50;
      }
    }
    setBetsVisible(false);
    console.log("bet chosen ", betChosen);
    getSocket().emit("player-bet", betChosen);
  };

  return (
    <div className="row d-flex justify-content-center mt-5">
      <button
        className={"bet-button mx-2" + (bet == "50" ? " bet-selected" : "")}
        onClick={() => setBet(50)}
      >
        50
      </button>
      <button
        className={"bet-button mx-2" + (bet == "100" ? " bet-selected" : "")}
        onClick={() => setBet(100)}
      >
        100
      </button>
      <button
        className={
          "bet-button mx-2" + (bet === "custom" ? " bet-selected" : "")
        }
        id="customButton"
        onClick={() => activateCustomInput()}
      >
        Custom
      </button>
      <button className="bet-submit-button mx-2" onClick={handleSubmit}>
        Bet
      </button>
    </div>
  );
};

export default Bets;
