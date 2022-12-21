// import "./Asset.css";

export default function Asset({ props }) {
  return (
    <div className="asset p-2 py-4 bg-[#014885] rounded-lg w-[20vw] px-8 my-4 text-white mx-auto">
      <p className="text-xl">
        Asset Name:<span className="ml-4 text-black text-xl"> {props.assetName}</span>
      </p>
      <p>
        Asset Type: <span className="ml-4">{props.assetType}</span>
      </p>
      <p>
        Asset Location: <span className="ml-4">{props.location}</span>
      </p>
      <p>
        Asset Quantity: <span className="ml-4">{props.quantity}</span>
      </p>
      <p>
        Total Value:
        <span className="ml-4">
          {props.quantity * props.valuePerAsset +
            props.quantity * props.capitalGainPerAsset}
        </span>
      </p>
      <p>
        Capital Gain:{" "}
        <span className="ml-4">
          {props.quantity * props.capitalGainPerAsset}
        </span>
      </p>
      <p>
        Associated Risk:{" "}
        <span className="ml-4">
          {props.quantity * props.associatedRiskPerAsset}
        </span>
      </p>
    </div>
  );
}
