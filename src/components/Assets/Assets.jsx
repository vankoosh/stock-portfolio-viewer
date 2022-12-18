import React from "react";
import Asset from "../Asset/Asset"

export default function Assets({ props }) {
  if (props) {
      console.log(typeof props.assets)
    Object.entries(props.assets).forEach((asset) => {
        console.log(asset)
      })    
  } else {
    return <p>Props not received </p>
  }
}
