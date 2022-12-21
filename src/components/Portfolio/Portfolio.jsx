// import "./Portfolio.css";

export default function Portfolio({ props, setSelectedPortfolio }) {
  return (
    <div
      className="p-2 py-4 bg-[#014885] rounded-lg text-white w-[20vw] hover:cursor-pointer px-8 my-4 hover:bg-[#014885]-200"
      onClick={() => {
        setSelectedPortfolio(props);
      }}
    >
      <h2>
        Portfolio Name: <span className="ml-4">{props.portfolioName}</span>
      </h2>
      <p>
        Restriction Status:{" "}
        <span
          className={
            props.restrictionStatus === "breached"
              ? "ml-4 text-red-900"
              : "ml-4 text-white"
          }
        >
          {props.restrictionStatus}
        </span>
      </p>
    </div>
  );
}
