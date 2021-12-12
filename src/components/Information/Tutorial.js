import styles from "../../assets/Tutorial.module.css";

/**
 * Gives a tutorial for the different games available on the site
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 12/12/2021
 */
const Tutorial = () => {
  return (
    <div id="main" className="section-1-container section-container">
      <div className="container">
        {/* The row for the title tutorial row */}
        <div className="row">
          <div className={styles.outline}>
            <div className="container h-100">
              <div className="row h-100 justify-content-center align-items-center">
                <h1>Tutorials</h1>
              </div>
            </div>
          </div>
        </div>

        {/* The row for the Blackjack tutorial block */}
        <div className="row">
          {/* The left side of the Blackjack row */}
          <div className={"col-sm-6 col-12 " + styles.blackjackBlock1}>
            <div className="row h-50 justify-content-center align-items-center">
              <h2>
                <font color="white"> Blackjack </font>
              </h2>
            </div>
            <div className="row h-50 justify-content-center align-items-center">
              <h6>
                <font color="white">
                  Want to learn how to play Blackjack? <br />
                  Click here:
                </font>
                <a href="https://www.casino.org/blackjack/how-to-play/">
                  {" "}
                  Blackjack Tutorial
                </a>
              </h6>
            </div>
          </div>
          <div className={"col-sm-6 col-12 " + styles.blackjackBlock2}>
            {/* The right side of the Blackjack row */}
            <a href="https://www.casino.org/blackjack/how-to-play/">
              <img
                alt="Blackjack"
                className="img-fluid w-100"
                src="/Images/blackjack.PNG"
              />
            </a>
          </div>
        </div>

        {/* The row for the War tutorial block */}
        <div className="row">
          {/* The left side of the War row */}
          <div className={"col-sm-6 col-12 " + styles.warBlock1}>
            <div className="row h-50 justify-content-center align-items-center">
              <h2>
                <font color="white">
                  {" "}
                  War <br />
                </font>
              </h2>
            </div>
            <div className="row h-20 justify-content-center align-items-center">
              <h2>
                <font color="white">
                  {" "}
                  (Coming Soon!) <br />
                </font>
              </h2>
            </div>
            <div className="row h-40 justify-content-center align-items-center">
              <h6>
                <font color="white">
                  Want to learn how to play War? <br />
                  Click here:
                </font>
                <a href="https://www.wikihow.com/Play-War-(Card-Game)">
                  {" "}
                  War Tutorial
                </a>
              </h6>
            </div>
          </div>

          {/* The right side of the War row */}
          <div className={"col-sm-6 col-12 " + styles.warBlock2}>
            <a
              href="https://www.wikihow.com/Play-War-(Card-Game)"
              className="row h-100 justify-content-center align-items-center"
            >
              <img
                src="/Images/warpicture.jpg"
                alt="War"
                className="img-fluid w-100"
              />
            </a>
          </div>
        </div>

        {/* The row for the Poker tutorial block */}
        <div className="row">
          {/* The left side of the Poker row */}
          <div className={"col-sm-6 col-12 " + styles.pokerBlock1}>
            <div className="row h-50 justify-content-center align-items-center">
              <h2>
                <font color="white"> Poker </font>
              </h2>
            </div>
            <div className="row h-20 justify-content-center align-items-center">
              <h2>
                <font color="white">
                  {" "}
                  (Coming Soon!) <br />
                </font>
              </h2>
            </div>
            <div className="row h-30 justify-content-center align-items-center">
              <h6>
                <font color="white">
                  Want to learn how to play Poker? <br />
                  Click here:
                </font>
                <a href="https://www.wikihow.com/Play-Poker"> Poker Tutorial</a>
              </h6>
            </div>
          </div>

          {/* The right side of the War row */}
          <div className={"col-sm-6 col-12  " + styles.pokerBlock2}>
            <a
              href="https://www.wikihow.com/Play-Poker"
              className="row h-100 justify-content-center align-items-center"
            >
              <img
                className="img-fluid w-100"
                src="/Images/pokerpic.png"
                alt="Poker"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
