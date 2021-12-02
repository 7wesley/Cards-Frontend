import { useEffect, useRef, useState } from "react";
import { getSocket } from "../Socket";

const Bets = ({ setBetsVisible, timer, bank, setModalOpen }) => {
  const [bet, setBet] = useState("");
  const DEFAULT_BET = 50;
  const timerStyle = {
    width: `${50 - 2.5 * (20 - timer)}%`,
  };

  useEffect(() => {
    if (timer == 0) {
      setBet(DEFAULT_BET);
      handleBetSubmit();
    }
  }, [timer]);
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

  /**
   * Opens the Chat modal whenever the user clicks the "chat" button
   */
  const handleBetChat = () => {
    setModalOpen(true);
  };

  const handleBetSubmit = () => {
    let betChosen = bet ? bet : DEFAULT_BET;
    if (bet === "custom") {
      const customInput = document.getElementById("custom-input").value;
      if (/^\d+$/.test(customInput)) {
        betChosen = customInput;
      } else {
        betChosen = DEFAULT_BET;
      }
    }
    if (betChosen > bank) {
      betChosen = bank;
    }
    setBetsVisible(false);
    getSocket().emit("player-bet", betChosen);
  };

  return (
    <>
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
        <button className="bet-submit-button mx-2" onClick={handleBetSubmit}>
          Bet
        </button>
        <button
          className="choice-button mx-2 button-symbol"
          onClick={() => handleBetChat()}
        >
          Chat
        </button>
      </div>
      <div class="mt-3 mx-auto bet-timer" style={timerStyle}></div>
    </>
  );
};

export default Bets;
