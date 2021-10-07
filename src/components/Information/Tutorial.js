/**
 * Creates a Tutorial page that will link to tutorials on how to play the listed games from our website
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 5/29/2021
 */

 import styles from "../../assets/Tutorial.module.css";

 /**
  * The webpage that has information about this site and tutorials for each 
  *     game that is playable on this site
  * @returns This Tutorial page
  */
 const Tutorial = () => {
     return (
         <div id="main" class="section-1-container section-container">
            <div class="container">
                
                {/* The row for the title tutorial row */}
                <div class="row">
                    <div className={styles.outline}>
                        <div className="container h-100">
                            <div className="row h-100 justify-content-center align-items-center">
                                <h1>
                                    Tutorials
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>

                {/* The row for the Blackjack tutorial block */}
                <div class="row">
                        
                    {/* The left side of the Blackjack row */}
                    <div class="column" className={styles.blackjackBlock1}>
                        <div className="row h-50 justify-content-center align-items-center">
                            <h2>
                                <font color="white"> Blackjack </font>
                            </h2>
                        </div>
                        <div className="row h-50 justify-content-center align-items-center">
                            <h6>
                                <font color="white">Want to learn how to play Blackjack? <br/>
                                    Click here: 
                                </font> 
                                <a href="https://www.casino.org/blackjack/how-to-play/"> Blackjack Tutorial</a>
                            </h6>
                        </div>
                    </div>

                    {/* The right side of the Blackjack row */}
                    <a href="https://www.casino.org/blackjack/how-to-play/" class="column" className={styles.blackjackBlock2}>
                    </a>

                </div>

                {/* The row for the War tutorial block */}
                <div class="row">
                        
                    {/* The left side of the War row */}
                    <div class="column" className={styles.warBlock1}>
                        <div className="row h-50 justify-content-center align-items-center">
                            <h2>
                                <font color="white"> War <br/>                                
                                </font>
                            </h2>
                        </div>
                        <div className="row h-20 justify-content-center align-items-center">
                            <h2>
                                <font color="white"> (Coming Soon!) <br/>                                
                                </font>
                            </h2>
                        </div>
                        <div className="row h-40 justify-content-center align-items-center">
                            <h6>
                                <font color="white">Want to learn how to play War?  <br/>
                                    Click here: 
                                </font> 
                                <a href="https://www.wikihow.com/Play-War-(Card-Game)"> War Tutorial</a>
                            </h6>
                        </div>
                    </div>

                    {/* The right side of the War row */}
                    <div class="column" className={styles.warBlock2}>
                        <a href="https://www.wikihow.com/Play-War-(Card-Game)" className="row h-100 justify-content-center align-items-center">
                        </a>
                    </div>
                </div>

                {/* The row for the Poker tutorial block */}
                <div class="row">
                        
                    {/* The left side of the Poker row */}
                    <div class="column" className={styles.pokerBlock1}>
                        <div className="row h-50 justify-content-center align-items-center">
                            <h2>
                                <font color="white"> Poker </font>
                            </h2>
                        </div>
                        <div className="row h-20 justify-content-center align-items-center">
                            <h2>
                                <font color="white"> (Coming Soon!) <br/>                                
                                </font>
                            </h2>
                        </div>
                        <div className="row h-30 justify-content-center align-items-center">
                            <h6>
                                <font color="white">Want to learn how to play Poker?  <br/>
                                    Click here: 
                                </font> 
                                <a href="https://www.wikihow.com/Play-Poker"> Poker Tutorial</a>
                            </h6>
                        </div>
                    </div>

                    {/* The right side of the War row */}
                    <div class="column" className={styles.pokerBlock2}>
                        <a href="https://www.wikihow.com/Play-Poker" className="row h-100 justify-content-center align-items-center">
                        </a>
                    </div>

                </div>

            </div>
         </div>
     );
 };
 
 export default Tutorial;