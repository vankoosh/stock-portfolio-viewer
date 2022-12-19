import "./User.css";

export default function User({ props, handleUserClick }) {
  return (
    <div
      className="user"
      onClick={() => {
        handleUserClick(props);
      }}
    >
      <h1>
        {props.firstName} {props.lastName}
      </h1>
      <p>Risk Profile: {props.riskProfile}</p>
      <p>Net Worth: {props.aggNetWorth}</p>

      {props.portfolios.map((portfolio) => {
        return (
          <p key={portfolio.portfolioId + " portNames"}>
            {portfolio.portfolioName}
          </p>
        );
      })}

      <p>Restriction Status:{props.aggRestrictionStatus}</p>
      <p>Aggregated Cap. Gain:{props.aggCapGain}</p>
    </div>
  );
}
