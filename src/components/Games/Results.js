import { useEffect } from "react";

const Results = ({ userData, results, updateStorage, bank, setBank }) => {
  const id = userData && userData.username;

  useEffect(() => {
    const updateStats = async () => {
      if (id) {
        if (results.winners.some((winner) => winner.id === id)) {
          userData.stats.Wins++;
        } else {
          userData.stats.Losses++;
        }
        userData.stats.Played++;
        await updateStorage({ stats: userData.stats });
      }
    };
    updateStats();
  }, [id]);

  return (
    <>
      {results.prompt && <p className="h3">{results.prompt}</p>}
      {results.winners.map((winner, index) => (
        <div key={index}>
          <p className="h4">
            {winner.id === id ? <b>You win!</b> : `${winner.id} wins!`}
          </p>
        </div>
      ))}
    </>
  );
};

export default Results;
