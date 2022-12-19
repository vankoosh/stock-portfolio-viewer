import { useEffect, useState } from "react";
import "./User.css";

export default function User({ props, handleUserClick }) {
  const [netWorth, setNetWorth] = useState(0);
  const [capGain, setCapGain] = useState(0);

  useEffect(() => {
    let tempNetWorth = 0;
    props.portfolios.forEach((portfolio) => {
      portfolio.assets.forEach((asset) => {
        tempNetWorth += asset.quantity * asset.valuePerAsset;
      });
    });
    setNetWorth(tempNetWorth);
  }, [props.portfolios]);

  useEffect(() => {
    let tempCapGain = 0;
    props.portfolios.forEach((portfolio) => {
      portfolio.assets.forEach((asset) => {
        tempCapGain += asset.quantity * (asset.capitalGainPerAsset * 1);
      });
    });
    setCapGain(tempCapGain);
  }, [props.portfolios]);

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
      <p>Net Worth: {netWorth}</p>

      {props.portfolios.map((portfolio) => {
        return (
          <p key={portfolio.portfolioId + " portNames"}>
            {portfolio.portfolioName}
          </p>
        );
      })}

      <p>Restriction Statuses:</p>

      {props.portfolios.map((portfolio) => {
        return (
          <p key={portfolio.portfolioId + " portfolioStatus"}>
            {portfolio.portfolioId} : {portfolio.restrictionStatus}
          </p>
        );
      })}
      <p>Aggregated Cap. Gain:{capGain}</p>
    </div>
  );
}
