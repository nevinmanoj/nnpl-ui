import { useContext } from "react";
import "./header.scss";
import { PoContext } from "../../context/poProvider";

export const PoHeader = () => {
  const { savePo } = useContext(PoContext);
  return (
    <div className="po-header">
      <button className="save-button" onClick={() => savePo()}>
        Save
      </button>
      <button
        className="save-button"
        onClick={() => {
          console.log("Download soon");
        }}
      >
        Download
      </button>
    </div>
  );
};
