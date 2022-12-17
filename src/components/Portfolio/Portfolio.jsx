import "./Portfolio.css";

export default function Portfolio({ props }) {
  return (
    <div className="portfolio">
      <h2>Portfolio Name: {props.portfolioName}</h2>
      <p>Restriction Status: {props.restrictionStatus}</p>
    </div>
  );
}
