export default function Portfolio({ props, setSelectedPortfolio, activePortfolio, setActivePortfolio }) {
  return (
    <div
      id={props.portfolioId}
      className={
        activePortfolio && activePortfolio === props.portfolioId
        ?"p-2 py-4 bg-green-800 rounded-lg text-white hover:cursor-pointer w-[20vw] mx-auto px-8 my-4 hover:bg-green-800"
        :"p-2 py-4 bg-[#014885] rounded-lg text-white hover:cursor-pointer w-[20vw] mx-auto px-8 my-4 hover:bg-green-800"
      }
      onClick={(e) => {
        setSelectedPortfolio(props);
        setActivePortfolio(e.currentTarget.id)
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
