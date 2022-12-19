import "./Asset.css";

export default function Asset({ props }) {
  return (
    <div className="asset">
      <p>Asset Name: {props.assetName}</p>
      <p>Asset Type: {props.assetType}</p>
      <p>Asset Location: {props.location}</p>
      <p>Asset Quantity: {props.quantity}</p>
      <p>
        Total Value:
        {props.quantity * props.valuePerAsset +
          props.quantity * props.capitalGainPerAsset}
      </p>
      <p>Capital Gain: {props.quantity * props.capitalGainPerAsset}</p>
      <p>Associated Risk: {props.quantity * props.associatedRiskPerAsset}</p>
    </div>
  );
}
