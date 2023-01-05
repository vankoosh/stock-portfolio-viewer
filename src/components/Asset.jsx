export default function Asset({ asset }) {
  return (
    <div className="p-2 py-4 bg-green-800 rounded-lg w-[25vw] px-8 my-4 mx-auto">
      <p className="text-xl ">
        Asset Name:
        <span className="ml-4 text-black text-xl"> {asset.assetName}</span>
      </p>
      <p>
        Asset Type: <span className="ml-4">{asset.assetType}</span>
      </p>
      <p>
        Asset Location: <span className="ml-4">{asset.location}</span>
      </p>
      <p>
        Asset Quantity: <span className="ml-4">{asset.quantity}</span>
      </p>
      <p>
        Total Value:
        <span className="ml-4">
          {asset.quantity * asset.valuePerAsset +
            asset.quantity * asset.capitalGainPerAsset}
        </span>
      </p>
      <p>
        Capital Gain:
        <span className="ml-4">
          {asset.quantity * asset.capitalGainPerAsset}
        </span>
      </p>
      <p>
        Associated Risk:
        <span className="ml-4">
          {asset.quantity * asset.associatedRiskPerAsset}
        </span>
      </p>
    </div>
  );
}
