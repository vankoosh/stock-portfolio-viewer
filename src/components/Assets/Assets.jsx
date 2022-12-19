import React from "react";
import Asset from "../Asset/Asset";

export default function Assets({ props }) {
  if (props) {
    return props.assets.map((asset) => { 
      return <Asset props={asset} />
    })
  } else {
    return <p>Please choose a portfolio...</p>;
  }
}

