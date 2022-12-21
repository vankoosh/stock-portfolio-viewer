// import "./User.css";

export default function User({ props, handleUserClick }) {

  return (
    <div
      className="p-2 py-4 bg-[#014885] rounded-lg w-[20vw] hover:cursor-pointer px-8 my-4 hover:bg-green-800 active:bg-green-800"
      onClick={() => {
        handleUserClick(props);
      }}
    >
      <h1 className="text-2xl">
        {props.firstName} {props.lastName}
      </h1>
      <p className="text-white">
        Risk Profile: <span className="ml-4">{props.riskProfile}</span>
      </p>
      <p className="text-white">
        Net Worth: <span className="ml-4">{props.aggNetWorth}</span>
      </p>

      {props.portfolios.map((portfolio) => {
        return (
          <p className="text-white" key={portfolio.portfolioId + " portNames"}>
            Portfolio Name:
            <span className="ml-4">{portfolio.portfolioName}</span>
          </p>
        );
      })}

      <p className="text-white">
        Restriction Status:
        <span className={props.aggRestrictionStatus === "breached"? "ml-4 text-red-900":"ml-4 text-white"}>{props.aggRestrictionStatus}</span>
      </p>
      <p className="text-white">
        Aggregated Cap. Gain:<span className="ml-4">{props.aggCapGain}</span>
      </p>
    </div>
  );
}
