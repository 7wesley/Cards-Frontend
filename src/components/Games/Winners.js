import { useEffect } from "react";

const Winners = ({ userData, winners, updateStorage }) => {
  const id = userData && userData.username;

  useEffect(() => {
    const updateStats = async () => {
      if (id) {
        if (winners.some((winner) => winner.id === id)) userData.stats.Wins++;
        else userData.stats.Losses++;
        userData.stats.Played++;
        await updateStorage({ stats: userData.stats });
      }
    };
    updateStats();
  }, [id]);

  return (
    <>
      {winners.map((winner, index) => (
        <div key={index}>
          <p className="h3">
            {winner.id === id ? "You win!" : `${winner.id} wins!`}
          </p>
          <p className="h6">Final hand value: {winner.total}</p>
          <p className="h4 mt-4">---Stats---</p>
          <p className="h6">
            {userData &&
              Object.keys(userData.stats).map(
                (stat) => `  ${stat}: ` + userData.stats[stat]
              )}
          </p>
        </div>
      ))}
    </>
  );
};

export default Winners;
