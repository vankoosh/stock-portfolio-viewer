import "./User.css";

export default function User({ props, handleUserClick }) {
  return (
    <div
      className="p-2 py-4 bg-[#014885] rounded-lg w-[20vw] px-8 my-4 hover:bg-[#014885]-200"
      onClick={() => {
        handleUserClick(props);
      }}
    >
      <h1 className="text-2xl">
        {props.firstName} {props.lastName}
      </h1>
      <p className="text-white">Risk Profile: {props.riskProfile}</p>
      <p className="text-white">Net Worth: {props.aggNetWorth}</p>

      {props.portfolios.map((portfolio) => {
        return (
          <p className="text-white" key={portfolio.portfolioId + " portNames"}>
            {portfolio.portfolioName}
          </p>
        );
      })}

      <p className="text-white">
        Restriction Status:{props.aggRestrictionStatus}
      </p>
      <p className="text-white">Aggregated Cap. Gain:{props.aggCapGain}</p>
    </div>
  );
}
