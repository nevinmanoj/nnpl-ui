import { useContext, useEffect } from "react";
import { UserContext } from "../context/userProvider";
import { ListTable } from "../components/docList/ListTable";
import { ListSearch } from "../components/docList/ListSeatch";
import "./DocList.scss";
import { DocFilter } from "../components/docList/filters";
import { useNavigate, useLocation } from "react-router-dom";
export const DocList = ({ item }) => {
  const { fetchAndSetdocList, token } = useContext(UserContext);
  const navigator = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchAndSetdocList(item);
  }, [item, token, location]);

  return (
    <div className="doclist-outer">
      <DocFilter />
      <div>
        <ListSearch />
        <ListTable />
      </div>
    </div>
  );
};
