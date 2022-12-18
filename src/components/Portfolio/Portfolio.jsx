import "./Portfolio.css";

export default function Portfolio({ props, setSelectedPortfolio }) {
  return (
    <div
      className="portfolio"
      onClick={() => {
        setSelectedPortfolio(props);
      }}
    >
      <h2>Portfolio Name: {props.portfolioName}</h2>
      <p>Restriction Status: {props.restrictionStatus}</p>
    </div>
  );
}
