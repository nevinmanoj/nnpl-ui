import TextField from "@mui/material/TextField";
import { useContext } from "react";
import { PoContext } from "../../context/poProvider";

export const Tc = () => {
  //   const list = ["Payment", "Billing", "Taxes", "Delivery"];
  const { tc, setTc } = useContext(PoContext);
  const handleTcChange = (value, key) => {
    setTc({ ...tc, [key]: value });
  };
  return (
    <div>
      {Object.entries(tc).map(([key, value]) => (
        <div key={key}>
          {" "}
          <TextField
            variant="standard"
            onChange={(e) => {
              handleTcChange(e.target.value, key);
            }}
            value={value}
            placeholder={key}
          />
        </div>
      ))}
    </div>
  );
};
