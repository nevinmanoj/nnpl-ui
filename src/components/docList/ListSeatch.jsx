import { TextField, Button, IconButton } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

import "./ListSearch.scss";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userProvider";
export const ListSearch = () => {
  const navigator = useNavigate();
  const location = useLocation();

  const { modifyFilter, filter } = useContext(UserContext);

  const [refNo, setrefNo] = useState(null);
  useEffect(() => {
    setrefNo(filter.ref === undefined ? "" : filter.ref);
  }, [filter]);

  const searchDoc = () => {
    if (refNo != null && refNo != "") {
      modifyFilter({ ref: refNo });
    }
  };
  const newDoc = () => {
    navigator(location.pathname + "/new");
  };
  return (
    <div className="listsearch-outer">
      <div className="listsearch-field">
        <TextField
          className="listsearch-field"
          placeholder="Enter Ref No to search"
          onChange={(e) => setrefNo(e.target.value)}
          value={refNo}
          size="small"
        />
      </div>
      <div className="listsearch-search-btn">
        <Button
          disabled={refNo == null || refNo == ""}
          variant="outlined"
          onClick={() => searchDoc()}
        >
          Search
        </Button>
      </div>
      <div className="listsearch-new-btn">
        <Button variant="outlined" onClick={() => newDoc()}>
          Create New
        </Button>
      </div>
    </div>
  );
};
