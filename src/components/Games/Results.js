import { useEffect } from "react";

const Results = ({ userData, results, updateStorage, bank, setBank }) => {
  const id = userData && userData.username;

  useEffect(() => {
    const updateStats = async () => {
      if (id && results.update) {
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
      {results.prompt && (
        <>
          <p className="h3">{results.prompt}</p>
          <p className="mt-0 pt-0">{"-".repeat(40)}</p>
        </>
      )}
      {results.winners.map((winner, index) => (
        <div key={index}>
          <p className="h5">{winner.id === id ? "You" : `${winner.id}`}</p>
        </div>
      ))}
      {!results.winners.length && <p className="h4">Nobody wins!</p>}
    </>
  );
};

export default Results;
